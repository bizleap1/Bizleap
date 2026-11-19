import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const DATA_DIR = path.join(process.cwd(), "data");
const EXCEL_FILE_PATH = path.join(DATA_DIR, "seo-audit-leads.xlsx");

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

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
 * Appends a lead row to data/seo-audit-leads.xlsx.
 * Creates the workbook and sheet if it does not exist yet.
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
    ensureDataDir();

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

    let workbook;
    let existingRows = [];

    if (fs.existsSync(EXCEL_FILE_PATH)) {
      try {
        workbook = XLSX.readFile(EXCEL_FILE_PATH);
        const sheetName = workbook.SheetNames[0] || "Leads";
        const sheet = workbook.Sheets[sheetName];
        if (sheet) {
          existingRows = XLSX.utils.sheet_to_json(sheet) || [];
        }
      } catch (err) {
        console.warn("[ExcelStore] Could not read existing workbook, initializing fresh:", err?.message || err);
        workbook = null;
      }
    }

    if (!workbook) {
      workbook = XLSX.utils.book_new();
    }

    const updatedRows = [...existingRows, newRow];
    const updatedSheet = XLSX.utils.json_to_sheet(updatedRows);

    // Set nice column widths for Excel
    updatedSheet["!cols"] = [
      { wch: 24 }, // Date & Time
      { wch: 22 }, // Name
      { wch: 28 }, // Email
      { wch: 18 }, // Phone
      { wch: 35 }, // Website
      { wch: 14 }, // SEO Score
      { wch: 18 }, // Performance Score
      { wch: 16 }, // Status
    ];

    const sheetName = "Leads";
    workbook.Sheets[sheetName] = updatedSheet;
    if (!workbook.SheetNames.includes(sheetName)) {
      workbook.SheetNames.push(sheetName);
    }

    XLSX.writeFile(workbook, EXCEL_FILE_PATH);
    console.log(`[ExcelStore] Recorded lead for "${name}" in ${EXCEL_FILE_PATH}`);
    return true;
  } catch (error) {
    console.error("[ExcelStore] Failed to record lead in Excel:", error);
    return false;
  }
}

/**
 * Returns the buffer of the Excel workbook (or creates an empty one if none exists).
 */
export function getExcelFileBuffer() {
  ensureDataDir();

  if (fs.existsSync(EXCEL_FILE_PATH)) {
    return fs.readFileSync(EXCEL_FILE_PATH);
  }

  // Create empty template if no leads yet
  const workbook = XLSX.utils.book_new();
  const emptySheet = XLSX.utils.json_to_sheet([]);
  emptySheet["!cols"] = [
    { wch: 24 },
    { wch: 22 },
    { wch: 28 },
    { wch: 18 },
    { wch: 35 },
    { wch: 14 },
    { wch: 18 },
    { wch: 16 },
  ];
  XLSX.utils.book_append_sheet(workbook, emptySheet, "Leads");
  XLSX.writeFile(workbook, EXCEL_FILE_PATH);
  return fs.readFileSync(EXCEL_FILE_PATH);
}

export function getExcelFilePath() {
  return EXCEL_FILE_PATH;
}
