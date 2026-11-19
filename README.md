# Bizleap Website (bizleap.in)

Next.js (Pages Router) + Tailwind CSS website for **BizLeap India Pvt. Ltd.**

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

All keys below are **server-side only** and must never be prefixed with `NEXT_PUBLIC_`:

| Variable | Description |
| --- | --- |
| `PAGESPEED_API_KEY` | Google PageSpeed Insights API v5 key used by `POST /api/seo-audit` to run Mobile and Desktop Lighthouse audits. |
| `LEADS_WEBHOOK_URL` | Server-side webhook endpoint (e.g., Google Apps Script Web App URL) where Free SEO Audit leads are saved (`name`, `email`, `phone`, `website`, `seoScore`, `perfScore`). |
| `LEADS_WEBHOOK_SECRET` | Shared secret token sent in the `secret` field of the JSON POST payload to `LEADS_WEBHOOK_URL`. |
| `GEMINI_API_KEY` | Google Generative AI key used by `POST /api/chat`. |

## Free SEO Audit Feature

- **Top Announcement Bar:** Site-wide sticky bar (`components/AnnouncementBar.js`) linking to `/free-seo-audit` (dismissible per session via `sessionStorage`).
- **Audit Flow Page:** `/free-seo-audit` (`pages/free-seo-audit.js`) — 3-step lead-gated audit flow (URL validation → mandatory lead capture → live Mobile/Desktop Lighthouse + HTML audit → print-ready A4 PDF report).
- **API Route:** `POST /api/seo-audit` (`pages/api/seo-audit.js`) — includes SSRF protection (blocks localhost and private/reserved IPs across redirects), 5 audits/IP/hour rate limiting, parallel PageSpeed Insights v5 calls, and Cheerio on-page/technical checks.
- **Lead Storage (Excel):** All lead data (Name, Email, Phone, Website, Date/Time IST, SEO Score, Performance Score, Status) is recorded automatically to `data/seo-audit-leads.xlsx`.
- **Download Link:** `GET /api/download-leads` (`pages/api/download-leads.js`) — downloads the complete leads Excel sheet (`bizleap-seo-audit-leads.xlsx`).
