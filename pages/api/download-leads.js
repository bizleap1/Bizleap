import { getExcelFileBuffer, getExcelFilePath } from "../../lib/seoAudit/excelStore";
import fs from "fs";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", ["GET", "HEAD"]);
    return res.status(405).json({ error: "Method not allowed. Use GET to download." });
  }

  try {
    const buffer = getExcelFileBuffer();
    const filePath = getExcelFilePath();
    const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;

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
    if (stats?.size) {
      res.setHeader("Content-Length", stats.size);
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
