import dns from "dns";
import net from "net";

const dnsLookup = dns.promises.lookup;

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "localhost.localdomain",
  "ip6-localhost",
  "ip6-loopback",
  "metadata.google.internal",
  "metadata",
]);

function ipv4ToInt(ip) {
  const parts = ip.split(".").map((n) => Number(n));
  if (parts.length !== 4 || parts.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) {
    return null;
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function isPrivateOrReservedIpv4(ip) {
  const num = ipv4ToInt(ip);
  if (num === null) return true;

  const first = (num >>> 24) & 255;
  const second = (num >>> 16) & 255;

  if (first === 0) return true; // 0.0.0.0/8
  if (first === 10) return true; // 10.0.0.0/8
  if (first === 100 && second >= 64 && second <= 127) return true; // 100.64.0.0/10 (CGNAT)
  if (first === 127) return true; // 127.0.0.0/8 (loopback)
  if (first === 169 && second === 254) return true; // 169.254.0.0/16 (link-local / cloud metadata)
  if (first === 172 && second >= 16 && second <= 31) return true; // 172.16.0.0/12
  if (first === 192 && second === 0 && ((num >>> 8) & 255) === 0) return true; // 192.0.0.0/24
  if (first === 192 && second === 0 && ((num >>> 8) & 255) === 2) return true; // 192.0.2.0/24
  if (first === 192 && second === 168) return true; // 192.168.0.0/16
  if (first === 198 && (second === 18 || second === 19)) return true; // 198.18.0.0/15
  if (first >= 224) return true; // multicast & reserved (224.0.0.0+)

  return false;
}

export function isPrivateOrReservedIpv6(ip) {
  const normalized = ip.toLowerCase().split("%")[0];

  if (normalized === "::" || normalized === "::1" || normalized === "0:0:0:0:0:0:0:1" || normalized === "0:0:0:0:0:0:0:0") {
    return true;
  }

  // IPv4-mapped IPv6 (e.g. ::ffff:127.0.0.1 or ::ffff:7f00:1)
  if (normalized.startsWith("::ffff:")) {
    const tail = normalized.slice(7);
    if (net.isIPv4(tail)) {
      return isPrivateOrReservedIpv4(tail);
    }
    const hexParts = tail.split(":");
    if (hexParts.length === 2) {
      const hi = parseInt(hexParts[0], 16);
      const lo = parseInt(hexParts[1], 16);
      if (!Number.isNaN(hi) && !Number.isNaN(lo)) {
        const mapped = `${(hi >> 8) & 255}.${hi & 255}.${(lo >> 8) & 255}.${lo & 255}`;
        return isPrivateOrReservedIpv4(mapped);
      }
    }
    return true;
  }

  // Unique local addresses (fc00::/7 -> fc.. or fd..)
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  // Link-local (fe80::/10 -> fe8, fe9, fea, feb)
  if (/^fe[89ab]/i.test(normalized)) return true;
  // Site-local deprecated (fec0::/10)
  if (/^fe[cdef]/i.test(normalized)) return true;
  // Multicast (ff00::/8)
  if (normalized.startsWith("ff")) return true;

  return false;
}

export function isPrivateIp(ip) {
  const version = net.isIP(ip);
  if (version === 4) return isPrivateOrReservedIpv4(ip);
  if (version === 6) return isPrivateOrReservedIpv6(ip);
  return true;
}

export function normalizeUrlInput(rawUrl) {
  if (typeof rawUrl !== "string") {
    throw new Error("Please enter a valid website URL.");
  }
  let trimmed = rawUrl.trim();
  if (!trimmed) {
    throw new Error("Please enter a valid website URL.");
  }

  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error("Please enter a valid public website URL (e.g. https://yourwebsite.com).");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only http:// and https:// URLs are supported.");
  }

  if (parsed.username || parsed.password) {
    throw new Error("URLs containing credentials are not allowed.");
  }

  const hostname = parsed.hostname.replace(/^\[|\]$/g, "").toLowerCase();
  if (!hostname || BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith(".local") || hostname.endsWith(".internal") || hostname.endsWith(".localhost")) {
    throw new Error("Private or local addresses cannot be audited.");
  }

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error("Private or internal IP addresses cannot be audited.");
    }
  } else {
    // Must contain at least one dot and a valid TLD
    if (!hostname.includes(".") || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(hostname)) {
      throw new Error("Please enter a valid public domain name (e.g. https://yourwebsite.com).");
    }
  }

  return parsed.toString();
}

export async function assertPublicUrl(rawUrl) {
  const normalized = normalizeUrlInput(rawUrl);
  const parsed = new URL(normalized);
  const hostname = parsed.hostname.replace(/^\[|\]$/g, "").toLowerCase();

  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw new Error("Private or internal IP addresses cannot be audited.");
    }
    return normalized;
  }

  let addresses;
  try {
    addresses = await dnsLookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("Could not resolve the website domain. Please check the URL and try again.");
  }

  if (!addresses || addresses.length === 0) {
    throw new Error("Could not resolve the website domain.");
  }

  for (const record of addresses) {
    if (isPrivateIp(record.address)) {
      throw new Error("This URL resolves to a private or restricted IP address and cannot be audited.");
    }
  }

  return normalized;
}

/**
 * Fetches a remote resource with SSRF validation on every redirect hop,
 * strict timeout, max redirects, and max byte size limit.
 */
export async function safeFetch(
  initialUrl,
  { timeoutMs = 10000, maxRedirects = 3, maxBytes = 2 * 1024 * 1024, accept = "text/html,application/xhtml+xml,*/*;q=0.8" } = {}
) {
  let currentUrl = await assertPublicUrl(initialUrl);
  const deadline = Date.now() + timeoutMs;

  for (let hop = 0; hop <= maxRedirects; hop++) {
    const remainingMs = deadline - Date.now();
    if (remainingMs <= 0) {
      throw new Error("The website took too long to respond.");
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), remainingMs);

    let res;
    try {
      res = await fetch(currentUrl, {
        method: "GET",
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; BizleapSEOAuditBot/1.0; +https://bizleap.in/free-seo-audit)",
          Accept: accept,
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
    } catch (err) {
      clearTimeout(timer);
      if (err && err.name === "AbortError") {
        throw new Error("The website took too long to respond.");
      }
      throw new Error("Unable to connect to the website.");
    }

    // Handle redirects safely
    if (res.status >= 300 && res.status < 400) {
      clearTimeout(timer);
      const location = res.headers.get("location");
      if (!location) {
        throw new Error("Invalid redirect response from website.");
      }
      if (hop === maxRedirects) {
        throw new Error("Too many redirects while loading the website.");
      }
      let nextUrl;
      try {
        nextUrl = new URL(location, currentUrl).toString();
      } catch {
        throw new Error("Invalid redirect URL.");
      }
      currentUrl = await assertPublicUrl(nextUrl);
      continue;
    }

    // Read body up to maxBytes
    try {
      const contentLength = Number(res.headers.get("content-length") || 0);
      if (contentLength > maxBytes) {
        controller.abort();
        throw new Error("Website HTML exceeds the 2MB analysis limit.");
      }

      const chunks = [];
      let totalBytes = 0;

      if (res.body && typeof res.body.getReader === "function") {
        const reader = res.body.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            totalBytes += value.byteLength;
            if (totalBytes > maxBytes) {
              reader.cancel().catch(() => {});
              break; // Analyze up to 2MB safely
            }
            chunks.push(Buffer.from(value));
          }
        }
      } else {
        const text = await res.text();
        chunks.push(Buffer.from(text.slice(0, maxBytes), "utf8"));
      }

      clearTimeout(timer);
      const bodyText = Buffer.concat(chunks).toString("utf8");

      return {
        status: res.status,
        ok: res.ok,
        finalUrl: currentUrl,
        headers: res.headers,
        text: bodyText,
      };
    } catch (err) {
      clearTimeout(timer);
      if (err && err.name === "AbortError") {
        throw new Error("The website took too long to respond.");
      }
      throw err;
    }
  }

  throw new Error("Too many redirects while loading the website.");
}
