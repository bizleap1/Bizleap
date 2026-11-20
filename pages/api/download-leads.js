import { getExcelFileBuffer, getAllLeadRows } from "../../lib/seoAudit/excelStore";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", ["GET", "HEAD"]);
    res.status(405).json({ error: "Method not allowed. Use GET to download." });
    return;
  }

  // JSON export
  if (req.query.format === "json") {
    const rows = await getAllLeadRows();
    return res.status(200).json({ count: rows.length, leads: rows });
  }

  // Direct HTML Table viewer
  if (req.query.view === "table" || req.query.format === "html") {
    const rows = await getAllLeadRows();
    const rowsHtml = rows
      .map(
        (r, i) => `
        <tr style="border-bottom: 1px solid #262626;">
          <td style="padding: 12px; color: #a3a3a3;">${i + 1}</td>
          <td style="padding: 12px; color: #e5e5e5; white-space: nowrap;">${r["Date & Time (IST)"] || "—"}</td>
          <td style="padding: 12px; font-weight: 600; color: #ffffff;">${r["Full Name"] || "—"}</td>
          <td style="padding: 12px;"><a href="mailto:${r["Email Address"]}" style="color: #FFD600; text-decoration: none;">${r["Email Address"] || "—"}</a></td>
          <td style="padding: 12px;"><a href="tel:${r["Phone Number"]}" style="color: #FFD600; text-decoration: none; font-weight: 600;">${r["Phone Number"] || "—"}</a></td>
          <td style="padding: 12px;"><a href="${r["Website Audited"]}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: underline;">${r["Website Audited"] || "—"}</a></td>
          <td style="padding: 12px; text-align: center; color: #ffffff;">${r["SEO Score"] || "—"}</td>
          <td style="padding: 12px; text-align: center; color: #ffffff;">${r["Performance Score"] || "—"}</td>
          <td style="padding: 12px; text-align: center;"><span style="padding: 4px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: #22c55e20; color: #4ade80;">${r["Status"] || "Completed"}</span></td>
        </tr>
      `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bizleap — SEO Audit Leads</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0a; color: #fff; margin: 0; padding: 32px 20px; }
          .container { max-width: 1200px; margin: 0 auto; }
          .header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #262626; }
          h1 { margin: 0; font-size: 24px; color: #fff; }
          .badge { background: #FFD600; color: #000; font-weight: bold; padding: 4px 10px; border-radius: 12px; font-size: 13px; margin-left: 10px; }
          .btn { background: #FFD600; color: #000; font-weight: bold; text-decoration: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; display: inline-flex; align-items: center; gap: 8px; }
          .btn:hover { background: #facc15; }
          table { width: 100%; border-collapse: collapse; background: #141414; border-radius: 12px; overflow: hidden; font-size: 13px; border: 1px solid #262626; }
          th { background: #1f1f1f; padding: 12px; text-align: left; font-size: 12px; color: #a3a3a3; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #262626; }
          .empty { text-align: center; padding: 48px 20px; color: #737373; font-size: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div>
              <h1>Bizleap SEO Audit Leads <span class="badge">${rows.length} Total</span></h1>
              <p style="margin: 6px 0 0 0; color: #737373; font-size: 13px;">Live database of all website audit inquiries</p>
            </div>
            <div>
              <a href="/api/download-leads" class="btn">📥 Download Excel (.xlsx)</a>
            </div>
          </div>
          <div style="overflow-x: auto;">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date &amp; Time (IST)</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Website Audited</th>
                  <th style="text-align: center;">SEO</th>
                  <th style="text-align: center;">Speed</th>
                  <th style="text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${rows.length > 0 ? rowsHtml : '<tr><td colspan="9" class="empty">No leads recorded yet.</td></tr>'}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);
  }

  // Default: Direct Excel (.xlsx) download
  try {
    const buffer = await getExcelFileBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="bizleap-seo-audit-leads.xlsx"'
    );
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    if (buffer && buffer.length) {
      res.setHeader("Content-Length", buffer.length);
    }

    if (req.method === "HEAD") {
      res.status(200).end();
      return;
    }

    res.status(200).send(buffer);
  } catch (error) {
    console.error("[DownloadLeads] Failed to serve Excel file:", error);
    res.status(500).json({ error: "Failed to generate Excel download." });
  }
}
