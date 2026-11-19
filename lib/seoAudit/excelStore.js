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
    const allRows = [...diskRows];

    // Append newRow if not already present
    const isDuplicate = allRows.some(
      (r) =>
        r["Email Address"] === newRow["Email Address"] &&
        r["Website Audited"] === newRow["Website Audited"] &&
        r["Date & Time (IST)"] === newRow["Date & Time (IST)"]
    );
    if (!isDuplicate) {
      allRows.push(newRow);
    }

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
    } catch (writeErr) {
      // If primary path failed, try writing to /tmp
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
 * If disk file is missing or read-only, generates the buffer directly in-memory.
 * Guarantees a valid Excel file buffer is returned without throwing 500 errors.
 */
export function getExcelFileBuffer() {
  try {
    // 1. Read existing rows from disk if available
    const diskRows = readExistingRowsFromDisk();

    // 2. Merge with in-memory rows
    const merged = [...diskRows];
    for (const memRow of globalThis.__bizleapLeads || []) {
      const exists = merged.some(
        (r) =>
          r["Email Address"] === memRow["Email Address"] &&
          r["Website Audited"] === memRow["Website Audited"] &&
          r["Date & Time (IST)"] === memRow["Date & Time (IST)"]
      );
      if (!exists) {
        merged.push(memRow);
      }
    }

    // 3. Build workbook
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(merged);
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

    // 4. Generate in-memory buffer directly (works universally on local & serverless)
    const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    return Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  } catch (err) {
    console.error("[ExcelStore] Error building workbook buffer:", err);

    // Extreme fallback: return minimal valid empty workbook buffer
    const fallbackWb = XLSX.utils.book_new();
    const emptySheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.book_append_sheet(fallbackWb, emptySheet, "Leads");
    const fallbackBuf = XLSX.write(fallbackWb, { type: "buffer", bookType: "xlsx" });
    return Buffer.isBuffer(fallbackBuf) ? fallbackBuf : Buffer.from(fallbackBuf);
  }
}
