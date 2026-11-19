import fs from "fs";
import path from "path";
import os from "os";
import * as XLSXModule from "xlsx";

const XLSX = XLSXModule.default || XLSXModule;

// Global in-memory storage fallback for serverless instances (Vercel/Lambda)
if (!globalThis.__bizleapLeads) {
  globalThis.__bizleapLeads = [];
}

const PRIMARY_DATA_DIR = path.join(process.cwd(), "data");
const PRIMARY_FILE_PATH = path.join(PRIMARY_DATA_DIR, "seo-audit-leads.xlsx");
const TMP_FILE_PATH = path.join(os.tmpdir(), "seo-audit-leads.xlsx");

function getIstTimestamp() {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(new Date());
  } catch {
    return new Date().toISOString();
  }
}

/**
 * Returns the best writable file path (prefers project /data folder, falls back to /tmp on serverless).
 */
function getTargetFilePath() {
  try {
    if (!fs.existsSync(PRIMARY_DATA_DIR)) {
      fs.mkdirSync(PRIMARY_DATA_DIR, { recursive: true });
    }
    // Test write permission
    const testFile = path.join(PRIMARY_DATA_DIR, ".write-test");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);
    return PRIMARY_FILE_PATH;
  } catch {
    return TMP_FILE_PATH;
  }
}

/**
 * Reads existing lead rows from disk (checking primary location first, then /tmp).
 */
function readExistingRowsFromDisk() {
  const candidates = [PRIMARY_FILE_PATH, TMP_FILE_PATH];
  for (const filePath of candidates) {
    try {
      if (fs.existsSync(filePath)) {
        const wb = XLSX.readFile(filePath);
        const sheetName = wb.SheetNames[0] || "Leads";
        const sheet = wb.Sheets[sheetName];
        if (sheet) {
          const rows = XLSX.utils.sheet_to_json(sheet);
          if (Array.isArray(rows) && rows.length > 0) {
            return rows;
          }
        }
      }
    } catch (err) {
      console.warn(`[ExcelStore] Could not read ${filePath}:`, err?.message || err);
    }
  }
  return [];
}

/**
 * Attempts to fetch all historical leads from LEADS_WEBHOOK_URL (Google Sheet).
 * This ensures all prior leads are preserved across serverless instances and redeployments.
 */
async function fetchRemoteLeadsFromWebhook() {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(webhookUrl, {
      method: "GET",
      headers: { Accept: "application/json" },
      redirect: "follow",
      signal: controller.signal,
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json().catch(() => null);
    const rawList = Array.isArray(data?.leads)
      ? data.leads
      : Array.isArray(data)
      ? data
      : [];

    return rawList.map((item) => ({
      "Date & Time (IST)":
        item["Date & Time (IST)"] ||
        (item.submittedAt ? new Date(item.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : getIstTimestamp()),
      "Full Name": item["Full Name"] || item.name || "N/A",
      "Email Address": item["Email Address"] || item.email || "N/A",
      "Phone Number": item["Phone Number"] || item.phone || "N/A",
      "Website Audited": item["Website Audited"] || item.website || "N/A",
      "SEO Score":
        item["SEO Score"] ||
        (typeof item.seoScore === "number" ? `${item.seoScore}/100` : "N/A"),
      "Performance Score":
        item["Performance Score"] ||
        (typeof item.perfScore === "number" ? `${item.perfScore}/100` : "N/A"),
      "Status": item["Status"] || item.status || "Completed",
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

function deduplicateRows(rows) {
  const seen = new Set();
  const result = [];

  for (const r of rows) {
    if (!r) continue;
    const email = (r["Email Address"] || "").toLowerCase().trim();
    const phone = (r["Phone Number"] || "").replace(/\s+/g, "").trim();
    const site = (r["Website Audited"] || "").toLowerCase().trim();
    const time = (r["Date & Time (IST)"] || "").trim();

    const key = `${email}__${phone}__${site}__${time}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(r);
    }
  }

  return result;
}

/**
 * Records a lead both in memory and to disk (.xlsx).
 * Never throws — safe for both local dev and serverless environments.
 */
export function recordLeadInExcel({
  name,
  email,
  phone,
  website,
  seoScore = null,
  perfScore = null,
  status = "Completed",
}) {
  try {
    const newRow = {
      "Date & Time (IST)": getIstTimestamp(),
      "Full Name": name || "N/A",
      "Email Address": email || "N/A",
      "Phone Number": phone ? (phone.startsWith("+91") ? phone : `+91 ${phone}`) : "N/A",
      "Website Audited": website || "N/A",
      "SEO Score": typeof seoScore === "number" ? `${seoScore}/100` : "N/A",
      "Performance Score": typeof perfScore === "number" ? `${perfScore}/100` : "N/A",
      "Status": status,
    };

    // 1. Always store in memory
    globalThis.__bizleapLeads.push(newRow);

    // 2. Combine with any existing rows on disk
    const diskRows = readExistingRowsFromDisk();
    const allRows = deduplicateRows([...diskRows, ...globalThis.__bizleapLeads, newRow]);

    // 3. Create workbook and write to disk
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(allRows);
    sheet["!cols"] = [
      { wch: 24 }, // Date & Time
      { wch: 22 }, // Name
      { wch: 28 }, // Email
      { wch: 18 }, // Phone
      { wch: 35 }, // Website
      { wch: 14 }, // SEO Score
      { wch: 18 }, // Performance Score
      { wch: 16 }, // Status
    ];
    XLSX.utils.book_append_sheet(workbook, sheet, "Leads");

    const targetPath = getTargetFilePath();
    try {
      XLSX.writeFile(workbook, targetPath);
      console.log(`[ExcelStore] Saved ${allRows.length} leads to ${targetPath}`);
    } catch {
      if (targetPath !== TMP_FILE_PATH) {
        try {
          XLSX.writeFile(workbook, TMP_FILE_PATH);
          console.log(`[ExcelStore] Saved ${allRows.length} leads to fallback ${TMP_FILE_PATH}`);
        } catch {
          // In-memory array still holds the lead safely
        }
      }
    }

    return true;
  } catch (error) {
    console.error("[ExcelStore] Error recording lead:", error);
    return false;
  }
}

/**
 * Generates and returns an Excel buffer.
 * Pulls all historical leads from:
 * 1. Remote Google Sheet webhook (if configured)
 * 2. Disk file (if available)
 * 3. In-memory leads array
 * Deduplicates and builds the complete master Excel file.
 */
export async function getExcelFileBuffer() {
  try {
    // 1. Fetch from Google Sheet webhook if available
    const remoteRows = await fetchRemoteLeadsFromWebhook();

    // 2. Read existing rows from disk if available
    const diskRows = readExistingRowsFromDisk();

    // 3. Merge with in-memory rows and deduplicate
    const combined = deduplicateRows([...remoteRows, ...diskRows, ...(globalThis.__bizleapLeads || [])]);

    // 4. Build workbook
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(combined);
    sheet["!cols"] = [
      { wch: 24 }, // Date & Time
      { wch: 22 }, // Name
      { wch: 28 }, // Email
      { wch: 18 }, // Phone
      { wch: 35 }, // Website
      { wch: 14 }, // SEO Score
      { wch: 18 }, // Performance Score
      { wch: 16 }, // Status
    ];
    XLSX.utils.book_append_sheet(workbook, sheet, "Leads");

    // Cache to disk if possible
    try {
      const targetPath = getTargetFilePath();
      XLSX.writeFile(workbook, targetPath);
    } catch {
      // Ignore disk caching errors
    }

    // 5. Generate in-memory buffer directly (works universally on local & serverless)
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  } catch (err) {
    console.error("[ExcelStore] Error building workbook buffer:", err);

    const fallbackWb = XLSX.utils.book_new();
    const emptySheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(fallbackWb, emptySheet, "Leads");
    const fallbackBuf = XLSX.write(fallbackWb, { type: "buffer", bookType: "xlsx" });
    return Buffer.isBuffer(fallbackBuf) ? fallbackBuf : Buffer.from(fallbackBuf);
  }
}
