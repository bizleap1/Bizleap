import { getExcelFileBuffer } from "../../lib/seoAudit/excelStore";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", ["GET", "HEAD"]);
    res.status(405).json({ error: "Method not allowed. Use GET to download." });
    return;
  }

  try {
    const buffer = getExcelFileBuffer();

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
