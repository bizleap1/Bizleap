const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_AUDITS_PER_WINDOW = 5;

const globalStore =
  globalThis.__bizleapSeoAuditRateLimit ||
  (globalThis.__bizleapSeoAuditRateLimit = new Map());

export function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim()) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

export function checkRateLimit(ip) {
  // Allow unlimited audits in development or from local loopback for testing
  if (
    process.env.NODE_ENV !== "production" ||
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip === "unknown" ||
    ip === "::ffff:127.0.0.1"
  ) {
    return {
      allowed: true,
      remaining: 999,
      retryAfterSec: 0,
    };
  }

  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  // Periodic cleanup if map grows
  if (globalStore.size > 500) {
    for (const [key, timestamps] of globalStore.entries()) {
      const active = timestamps.filter((t) => t > cutoff);
      if (active.length === 0) {
        globalStore.delete(key);
      } else {
        globalStore.set(key, active);
      }
    }
  }

  const existing = globalStore.get(ip) || [];
  const activeTimestamps = existing.filter((t) => t > cutoff);

  if (activeTimestamps.length >= MAX_AUDITS_PER_WINDOW) {
    const oldest = activeTimestamps[0];
    const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
    globalStore.set(ip, activeTimestamps);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec,
    };
  }

  activeTimestamps.push(now);
  globalStore.set(ip, activeTimestamps);

  return {
    allowed: true,
    remaining: MAX_AUDITS_PER_WINDOW - activeTimestamps.length,
    retryAfterSec: 0,
  };
}
