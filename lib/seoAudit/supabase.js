/**
 * Supabase client integration for Free SEO Audit Leads.
 * Uses native PostgREST HTTP API — fast, lightweight, and zero extra dependencies.
 */

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return {
    url: url.replace(/\/+$/, ""),
    key: key.trim(),
  };
}

/**
 * Saves a lead into Supabase 'seo_audit_leads' table.
 */
export async function saveLeadToSupabase({
  name,
  email,
  phone,
  website,
  seoScore = null,
  perfScore = null,
  status = "Completed",
}) {
  const config = getSupabaseConfig();
  if (!config) return false;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const payload = {
      name: name || "N/A",
      email: email || "N/A",
      phone: phone ? (phone.startsWith("+91") ? phone : `+91 ${phone}`) : "N/A",
      website: website || "N/A",
      seo_score: typeof seoScore === "number" ? `${seoScore}/100` : "N/A",
      perf_score: typeof perfScore === "number" ? `${perfScore}/100` : "N/A",
      status: status || "Completed",
    };

    const res = await fetch(`${config.url}/rest/v1/seo_audit_leads`, {
      method: "POST",
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`[Supabase] Insert error (${res.status}):`, errText);
      return false;
    }

    console.log(`[Supabase] Lead saved for "${name}" (${website})`);
    return true;
  } catch (err) {
    console.error("[Supabase] Failed to save lead:", err?.message || err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches all leads from Supabase 'seo_audit_leads' table.
 */
export async function fetchLeadsFromSupabase() {
  const config = getSupabaseConfig();
  if (!config) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(
      `${config.url}/rest/v1/seo_audit_leads?select=*&order=id.desc`,
      {
        method: "GET",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Accept: "application/json",
        },
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      return [];
    }

    const data = await res.json().catch(() => []);
    if (!Array.isArray(data)) return [];

    return data.map((item) => {
      let formattedTime = "N/A";
      try {
        if (item.created_at) {
          formattedTime = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(item.created_at));
        }
      } catch {
        formattedTime = item.created_at || "N/A";
      }

      return {
        "Date & Time (IST)": formattedTime,
        "Full Name": item.name || "N/A",
        "Email Address": item.email || "N/A",
        "Phone Number": item.phone || "N/A",
        "Website Audited": item.website || "N/A",
        "SEO Score": item.seo_score || "N/A",
        "Performance Score": item.perf_score || "N/A",
        Status: item.status || "Completed",
      };
    });
  } catch (err) {
    console.error("[Supabase] Failed to fetch leads:", err?.message || err);
    return [];
  } finally {
    clearTimeout(timer);
  }
}
