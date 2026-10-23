# 🏛️ Awami ERP — Features & Installation Document

> **Brand:** Awami ERP. Every document, voucher, report and print is branded with the **selected company's name and branch** — the company name is never hard-coded.

---

An enterprise-grade, localized ERP + public storefront specifically designed for the **Sanitary, Tile, and Brass Fittings industry**, built with **Next.js 16 (App Router), PostgreSQL 17, and Drizzle ORM**. It combines a customer-facing product website with a full back-office ERP covering accounting, inventory, POS, salesman tracking, and multi-company / multi-currency capabilities.

---

## 🛍️ 0. Public Storefront (Customer-facing Website)

The **home page (`/`)** is a public website that any visitor can open without logging in.

* **Hero Landing Page:** Showroom hero banner, tagline, and clear call-to-action buttons.
* **Live Business Stats Bar:** Products in catalog, total items in stock, **Sold Today**, and **Sold in the Last 30 Days** — computed live from the stock ledger.
* **Shop by Category:** Visual category cards (Sanitary Ware, Tiles, Brass Fittings, Accessories) with photos.
* **Featured Products** highlight strip (products flagged as *Featured* in the ERP).
* **Full Product Catalog** with:
  - Filter by **Category**
  - Filter by **Origin** (🇵🇰 Local / ✈️ Imported)
  - **Search** by name, brand, or color
  - **Sort** by Popularity, Price (low/high), Availability
  - Product cards showing **size, color, design, brand, price/unit, live stock**, "sold per month", and stock badges (*In Stock* / *Only X left* / *Out of Stock*).
* **Staff Login Button:** Prominent `🔐 Staff Login` link in the header & footer that opens the ERP login and leads authorized staff to the back office.

---

## 1. 👥 Multi-Site Party & Contact Management

* **Customer Directory & Vendor Profiles:** Fields for CNIC, NTN, STRN, phone, mobile, email, area, city, opening balance, credit limit, and active/inactive status.
* **Multi-Site / Office Support:** A single customer or vendor can have multiple delivery sites, each with its own address, contact person, contact number, site credit limit, and a **Site Closed** flag.
* **Live Balances:** Customer/vendor outstanding balances (Dr/Cr) computed from opening balance + posted vouchers.
* **Filer Status (ATL) & Sales Tax Registration**: Track if a partner is a Filer, Late Filer, or Non-Filer, and whether they are Sales Tax Registered (STRN). This profile directly drives automated tax withholding deductions and further tax charges during checkout.
* **View/Edit**: Detailed view panels show the full customer ledger, recent documents, site delivery registries, and allow editing all partner attributes with live FBR NTN/STRN format validation.
* **Contact Photo & Attached Documents**: Capture the contact person's photo (`contactPic`) and attach multiple license, NTN or registration documents (`documents`). Renders on detail views.

---

## 2. 📁 Workflow Documents (Quotation → Invoice)

* **Multi-File Attachments on every transaction**: Vouchers, Sales Invoices, Sales Returns, Purchase Invoices, Purchase Returns, Sales Orders, Purchase Orders, Quotations, Adjustment Invoices and POS bills each accept **multiple attachments in one go** (delivery challan, signed copy, gate pass, bank slip, supporting bills). Files are uploaded at once, shown as thumbnails for images and type icons for PDF/DOC/XLS/ZIP, and can be removed individually. Items, Customers, Vendors and Salesmen use the same uploader for their documents.
* **Full-Screen Entry Forms**: Every document and voucher editor (new and edit) plus the print viewer opens **maximised across the screen**, so all columns — item, condition, qty, rate, discount, amount, and the live tax panel — stay visible on one screen instead of being crammed into a narrow dialog.
* **Spreadsheet-Style Line Item Grid**: Line items are entered the same way as a voucher's account lines — **one always-editable row per item**, not a "fill a picker then press Add" form. Every column is live: Item, Condition (returns), Type (Goods/Services), Qty, Rate, Disc%, ST %, ST Amount, AIT §153, AIT %, AIT Amount and Amount. Stacked under the grid is an **+ Add line** button; `✕` removes a row. Tab moves across the row, and computed tax cells update as you type.
* **Searchable Line-Item Pickers**: Because catalogs commonly exceed **3,000+ SKUs**, the Item cell in each grid row is a **type-to-search combobox** rather than a native dropdown — filter instantly by code, name or brand with capped rendering so huge catalogs stay fast. Selecting an item auto-fills its description and default sale/cost price. The Party picker and the **Link-to-Invoice** picker (returns) are searchable the same way.
* **Blank-Row Safety**: Submitting skips any empty row left in the grid (and says how many were skipped), so tabbing past the last line never creates a junk line item.
* **Quotations:** Custom valid-until dates, salesman, line-item discounts. One-click **Quotation ➔ Sales Invoice**.
* **Sales Orders (SO):** Statuses *Open / Approved / Invoiced / Cancelled*. Convert **SO ➔ Sales Invoice** (auto-generates the invoice, posts ledger, deducts inventory).
* **Purchase Orders (PO):** Convert **PO ➔ Purchase Invoice** to record vendor bills and add stock.
* **Adjustment Invoices (ADJ):** Standalone stock quantity corrections that re-value inventory at cost and auto-post an **Inventory revaluation journal (Dr 1200 Inventory / Cr 5600 Inventory Adjustment)**.
* **Editable Line Items**: Every row in a document's line-item grid can be **edited in place** (swap the item via the searchable picker, change quantity, rate, discount % and — on returns — the damaged/broken/normal condition) and **deleted**. Totals, taxes and net payable recalculate instantly, and the server re-posts stock and ledger on save.
* **Monthly-Resetting Numbers**: Both document and voucher numbers restart at **0001 on the first of each month** (`INV-2026-11-0001`, `JV-2026-11-0001`), because the sequence key is `prefix + YYYY-MM`. The voucher form shows this rule inline.
* **Sales / Purchase Invoices:** Salesman assignment, transport & labor charges, sales tax, advance income tax, dual invoice discounts (percentage + lump-sum), and **monthly-resetting auto-numbers** (`INV-2026-04-0001`, `PINV-2026-04-0001`).
* **Sales / Purchase Returns with Invoice Reference**:
  - Return transactions can be selected to be **made against a specific invoice** (`linkedInvoiceId`), auto-filtering products, rates, and previous values, or made **independently without an invoice link**.
  - **Return Conditions**: Line items support return conditions: **Normal** (returned to standard available stock), **Damaged** (skipped from available stock; can be returned to vendor), or **Broken** (skipped from stock; written off as loss).
  - Damages or broken returns on the Purchase side support refunding a partial amount or rate.
* **Attached Documents**: Attached technical datasheets, signed challans, or passes directly onto the document and lists them in print views.
* **Walk-in Customer Capture**: Selecting **Walk-in Customer** switches the invoice header into an editable buyer block with **Name, Contact Person, Contact No., Address and City**, so unregistered retail buyers are still captured for the FBR tax invoice. Selecting any *registered* party flips the same block into a **read-only summary** of that party's name, contact person, contact number, address and city straight from their record — with an ST-Registered badge when applicable.
* **Online-Customer Channel**: A seeded **Online-Customer** party isolates web/app orders from counter sales. A dedicated **Reports → Online Orders** page reports order count, revenue (excluding tax), cost of goods, **gross profit and margin %**, sales tax collected and payment mode for any period — printable on A4/PDF and exportable to Excel.
* **Edit, Cancel, Delete, and View**:
  - **Edit**: Fully editable documents and lines (as long as they are not FBR-synced), re-routing and updating matching stock ledger entries and double-entry accounting records automatically with zero double-counting risk.
  - **Cancel**: Sets document status to `"Cancelled"`. Instantly reverses/deletes its stock ledger entries, and marks its auto-posted financial vouchers as Cancelled so they are ignored in accounts reports.
  - **Delete**: Safely cascade deletes the document, its lines, and all ledger footprints.
  - **View**: Renders full commercial details, itemized tax computations, FBR sync state, and print templates.

---

## 3. 🛒 POS Fast Billing Counter

* **Barcode / Code Selection:** Scan a barcode and press Enter to add items to the cart.
* **Visual Product Tiles:** Category icons, live stock indicators, and out-of-stock warnings.
* **Fast Checkout:** Cash / Bank / Card / Credit selection, instant on-screen thermal receipt, and automatic ledger + inventory posting.
* **Tax toggles**: Instantly switch between taxable and tax-exempt sales. If a named unregistered partner is loaded, the system automatically appends Further Tax.

---

## 4. 📒 Real-Time Ledgers, Multi-dimensional Posting & Financial Reports

* **Double-Entry Vouchers:** Journal (JV), Bank Receipt (BRV), Bank Payment (BPV), Cash Receipt (CRV), Cash Payment (CPV), and Adjustment (ADJ) — with automatic **debit = credit** balancing enforcement.
* **Customer Aging:** Buckets of 0–30, 31–60, 61–90 and 90+ days, with a **Last Payment** column (date + amount) alongside the last invoice date and amount, plus credit limit and total outstanding.
* **Daily Sales & Recovery:** Payment-mode breakdown per day (cash, bank, cheque, card, online, credit) with a **Breakdown** view per day listing exactly which sales invoices (subtotal, sales tax, further tax, total, paid, mode) and which recovery / payment vouchers produced that day's figures.
* **Single-Row Voucher Entry**: Every voucher posting occupies **one compact row** — Account, Debit, Credit, Party, Narration, Cheque No, Cheque Date, and the analytical chip all sit side by side (no split across two rows), so a voucher reads like a traditional cash book.
* **Cheque Tracking per Line**: Each entry line captures its own **cheque number and cheque date**, stored against the ledger line and included on the printed voucher.
* **Party Linked Line Items**: Party/contact association is mapped directly at the **ledger posting line item level**, permitting granular reconciliation of receivables/payables on mixed journal entries.
* **Guided Analytical Distribution**: Instead of typing free text, each line opens an **Analytical Distribution dialog**. Pick a department / cost centre (Showroom, Godown, Project, Wholesale, Retail, Installation, Transport, Head Office, Marketing, Other) and enter its percentage; add as many departments as needed.
  - **Hard 100% check**: the running total is shown live and turns red unless it is exactly **100%** — the dialog blocks saving and cannot be closed-as-saved while unbalanced. A one-click helper places any remainder on the first line. The line chip shows a green `100%` badge when balanced, amber otherwise.
* **Dynamic Letterhead Integration for Prints**: All prints—individual vouchers, voucher lists, Trial Balance, Profit & Loss, and Balance Sheets—dynamically fetch and incorporate the active, default Letterhead headerText and footerText from the database (falling back gracefully to the Al-Noor standard header if none is set).
* **Scope-Led Footer Text**: The *thank you / returns policy* footer prints only on customer-facing commercial documents (**Sales Invoices** and **Sales Orders**). Internal and accounting prints — vouchers, Trial Balance, Profit & Loss, Balance Sheet, stock, purchases and commission reports — carry the letterhead and sign-off only, keeping them clean for filing.
* **Zero-Value Suppression on Prints**: On invoices and vouchers, any charge or tax line that is **zero is omitted entirely** from the printed document — Discount, Sales Tax, Further Tax, Transport, Labor, AIT withholding, Paid, and a **Balance Due** row that only appears when money is outstanding. A simple exempt quotation therefore prints just Subtotal and Grand Total, while a fully-loaded invoice prints every applicable charge. Charges are also itemised separately (Transport and Labor each on their own row) instead of being merged.
* **A4, A5, and Thermal Printers Support**:
  - **A4 Layout**: Styled corporate ledger template for filing.
  - **A5 Layout**: Compact form suitable for customer/vendor transaction slips. Voucher prints show each line's cheque number, cheque date and analytical distribution.
  - **Thermal format**: Continuous tape layout optimized for 80mm/58mm slip printers.
* **CSV/Excel Export**: Instant export of any single voucher profile or the entire filtered vouchers list as a CSV file. Sales, Purchase, Stock, Commission and Tax reports all export to Excel and print to A4/PDF as **formatted report documents** (letterhead, bordered tables, totals) rather than raw screen captures.
* **Financial Statements with Comparative Statements (Current vs Previous Year)**:
  - **Period selection**: Date range filters (From / To) applied cleanly.
  - **Date-Range Selection**: All three statements are period based (From / To) and recalculate on demand.
  - **Print Balance Modes**: Each statement prints with **only current-period balances** or **with previous-year comparatives**, chosen before printing or exporting.
  - **Account Ledger Drill-Down**: Every line in the Trial Balance, Profit & Loss and Balance Sheet opens the **General Ledger of that account** — opening Dr/Cr, each voucher with date, number, narration, debit, credit and running balance, and the closing figure — showing exactly where the number came from. Printable on A4/PDF and exportable to Excel.
  - **Correct Totals Label**: The Trial Balance grand row is titled **Total** (not "Voucher Totals").
  - **Comparative Trial Balance**: Displays dynamic columns: **Opening Balance, Period Debit, Period Credit**, and **Ending Balance** side-by-side, with togglable prior year comparatives.
  - **Comparative Profit & Loss**: Side-by-side comparative statement displaying current vs prior year revenues, expenses, and net incomes.
  - **Comparative Balance Sheet**: Side-by-side comparative assets, liabilities, and equities showing double-entry integrity on both periods.
  - **Excel & PDF Exports**: Download Trial Balance, P&L, and Balance Sheet as exact-match Excel worksheets or print them cleanly to PDF with the same borders, fonts, and structures as viewed on A4 paper.
* **Searchable Account Picker**: Voucher entry lines select their GL account through a **searchable combobox** (code or name), which is essential once the chart of accounts grows past a few hundred accounts. The per-line Party link is searchable too.
* **Edit, Cancel, Delete, and View**: Every row in the Sales Invoice, Purchase Invoice, Sales Return, Purchase Return, Sales Order and Purchase Order lists exposes **View, Edit, Cancel and Delete**. Vouchers can be modified or set to "Cancelled" (excluding their lines from ledger summaries) with a simple click. Auto-posted invoice vouchers are safely locked to prevent manual tampering.

---

## 5. 💰 Payments, Returns, and Incentives

* Customer receipts & vendor payments via vouchers.
* Incentives tracking (given to customers / received from vendors).
* Adjustment vouchers for rate differences, write-offs, and round-offs.

---

## 6. 🤝 Salesmen & Commission System

* **Primary Salesman Link** per customer, with **invoice-level override**.
* **Salesman Document Pack**: Each salesman carries **multiple picture attachments** (face photo, CNIC front, CNIC back) plus document attachments (resume, contract, references). The photo shows in the salesman list and the file count is visible at a glance.
* **Commission Reports**: Sales volume, earned commission (from rate), paid, and outstanding commission per salesman.
* **Salesman Commission Ledger**: Real-time drill-down listing exactly which invoice, how much commission on each invoice, and which items were sold. Formatted cleanly in `LetterheadPrintWrapper` on A4, PDF, and Excel.

---

## 7. 📦 Inventory, Warehouses & Catalog

* **Product Catalog:** Category, brand, model, unit, rack location, **size, color, design, origin (Local/Imported), Featured flag**, cost & sale price, reorder level, opening stock.
* **Stock Ledger:** Chronological stock movements (+In / -Out) tied to source documents.
* **Reorder Alarms:** Dashboard highlights items at or below reorder level.
* **Professional Report Prints (not screen captures)**: The Sales, Purchase, Stock, Commission, Aging and Daily reports all render inside the letterhead as a bordered report document with company header, report title, period, data table and totals — then print to A4/PDF or export to Excel with the identical layout.
* **Invoice View from Reports**: Both the Sales Report and Purchase Report let you open any listed invoice straight from the report row to inspect or print it.
* **Stock Movement Matrix (period based)**: Item-wise report with **Opening Stock, Purchase, Purchase Return, Purchase Value, Sales, Sales Return, Sales Value, Adjustment Qty, Adjustment Value, Balance Qty, Balance Value** for any selected date range, with totals row.
* **Column Print Modes**: Print or export the matrix with **Only Qty columns**, **Only Value columns**, or **Both Qty and Value columns**.
* **Damaged & Broken Stock Report**: Separate view listing damaged and broken quantities and their value at cost for the period, excluding them from saleable stock.
* **Return Invoice Drill-Down**: From the damaged/broken report, open every **return invoice** behind an item's returns, showing doc no, party, qty, rate, value and the condition on each.
* **Item Ledger Report**: Drill down on any single inventory catalog item to view its complete chronological stock movements ledger (Opening, Date, Doc, Narration, Qty In, Qty Out, and running stock balance). Printable on A4, Excel, PDF.
* **Edit, Cancel/Deactivate, Delete, and View** on Warehouses and Catalog items.

---

## 🇵🇰 8. Pakistani Tax & FBR e-Invoicing Compliance

* **Sales Tax Act, 1990 Compliance**:
  - **LINE-LEVEL TAXATION — Sales Tax AND AIT (mixed invoices)**: Every tax is computed **per line item, not per invoice**, because one invoice may bill physical goods and services together. Each line carries its own **Item Type (Goods 📦 / Services 🛠️)**, **Sales Tax %**, **Exempt** flag, **AIT section u/s 153 (153(1)(a) goods / 153(1)(b) services / 153(1)(c) contract / none)** and **AIT %**. A single invoice can therefore charge 18% on a commode, 9% on an installation service, 0% on an exempt job, withhold AIT at 153(1)(a) on the goods and 153(1)(b) on the services — all in one document. The grid shows Type, ST%, ST amount, AIT §, and AIT amount per row; the totals panel splits tax into 📦 Goods ST and 🛠️ Services ST and shows total AIT withheld.
  - **Defaults vs overrides**: The invoice header keeps only a **default Sales Tax %** (applied to new lines) and the **buyer's filer status** (which drives the default AIT rate for every line). Any line may override its own section or rate. Turning "Exempt" on a line zeroes its sales tax, further tax and AIT.
  - **Further Tax (s.3(1A))**: Automated 4% further tax charged on supplies to unregistered persons.
  - **Zero-Rated & Exempt**: Dedicated flags to skip sales tax on zero-rated (Fifth Schedule) and exempt (Sixth Schedule) supplies.
  - **HS/PCT Codes**: Catalog tracks FBR-mandated 8-digit tariff codes (e.g. `6910.1000` for clay commodes) required on tax invoices.
* **Income Tax Ordinance, 2001 Section 153 Compliance**:
  - **Advance Income Tax (AIT)**: Auto-computes withholding on Goods, Services, or Contracts based on the counterparty's FBR ATL status (Filer, Late Filer, Non-Filer).
  - **Accounting treatment**: AIT is correctly treated as a withholding deduction from the payable (Net Payable = Grand − AIT), rather than a billing addition. Auto-posts corresponding **AIT Receivable (A/C 1310)** or **WHT Payable (A/C 2200)** ledger vouchers.
  - **Configurability**: Tax settings panel allows administrators to adjust all percentages at any time (e.g., standard filer goods rate 4.5%, services filer rate 9%, contract filer rate 7.5%, and double rates for non-filers).
* **FBR Digital Invoicing Integration (SRO 709(I)/2025, Rule 150Q)**:
  - **Real-Time API Sync**: Submits SINV, POS, and SRET invoices to FBR instantly upon generation.
  - **IRN & scannable QR**: Receives a unique FBR Invoice Number (Invoice Reference Number - IRN) and renders a compliant, verifiable QR code containing cryptographic invoice telemetry.
  - **FBR Sync Console**: Real-time stats, sync queue, detailed request/response JSON audit logger, NTN/STRN credential validation checklist, and production/sandbox simulator toggle.
  - **Fiscal Lock**: Syndicated FBR invoices are locked from deletion or direct edit. Reversals must be processed through credit notes (Sales Returns) according to Pakistani tax laws.
  - **Strict validation mode**: Optionally blocks posting any taxable invoice unless valid NTN/STRN business profiles are set.

---

## 9. 🛡️ Audit Trail & Permissions

* **Audit Log:** Records create / update / delete / cancel actions with performing user, timestamp, and change payload.
* **User Profiles with Photo:** Each staff account carries an **uploadable picture / avatar**, shown in the users list and resolved in the session payload.
* **Odoo-like Permissions:** Per-user menu rights grid (View, Create, Edit, Delete, Print, Export, Upload, Download).

---

## 10. 🌐 Multi-Company, Multi-Currency & Backup

* **Multi-Company** and **Multi-Currency** tables with exchange rates and symbols.
* **Letterheads:** Distinct print headers/footers, one marked default, plus **uploadable header and footer artwork images** that print above the body and below the footer text on every document and report.
* **Company & Branch on Every Print**: All prints — invoices, quotations, orders, returns, vouchers, statements, registers and reports — read their branding from the **selected company and branch at login**. The letterhead prints the company name, the branch (marked “Head Office” where applicable), address, phone/email and NTN/STRN, so a branch login prints that branch's identity and a head-office admin prints the company identity. `Awami ERP` is the product brand; the trading name on paper is always the company record.
* **Trade-Style Document Print (Invoice / Quotation / Order)**: Mirrors a printed trade invoice — brand mark, company name in bold italic with the branch tag beneath, address and tax registration, a `Page 1 of 1` marker and the document title (`INVOICE`, `QUOTATION`, `SALES ORDER`, `PURCHASE ORDER`, `SALES RETURN`, …) in a boxed block at the right.
  - **Party block**: Customer/Vendor name in capitals, address, phone, project, salesman, plus a dotted *Send Info* strip (Veh No. / Driver / Other Info / Mobile) for handwritten delivery details.
  - **Document-number box**: Invoice #, Date, then Order # / PO # / BO # on dotted rules.
  - **Line grid**: `Sr | Particulars | Qty | Unit | Rate | Gross Amount | Discount %age | Discount Amount | Net Amount`, plus **Sales Tax %** / **Sales Tax** and **AIT u/s 153** columns. Exempt lines print `EX` in the GST % cell and a note under the description.
  - **Zero-suppression**: if no line carries sales tax, the GST columns are omitted; if no line carries AIT, the AIT column is omitted; discount, further-tax, transport and labor rows only print when non-zero.
  - **Totals**: quantity + gross + discount + net totals row, then Sales Tax / Further Tax / charges rows, **Net Total**, **Less AIT** (when withheld) and a boxed **Grand Total** with the amount in words, then *Posted by …* and a signature rule.
* **Company Document Pack:** Each company accepts **multiple file attachments** (registration, NTN certificate, STRN certificate, contracts, agreements) using the same multi-file uploader as other modules; the file count shows in the companies list.
* **Bulk Data Transfer (migration from other software)**: A dedicated **Settings → Data Upload** screen with downloadable CSV **templates** and an importer for Items, Salesmen, Customers, Vendors, Chart of Accounts, Vouchers, Sales Invoices, Sales Returns, Purchase Invoices, Purchase Returns, Sales Orders, Purchase Orders, Quotations and Adjustment Invoices. Master data is upserted by code; transactions are grouped into documents and posted with full stock and ledger effects. Malformed rows are rejected with a precise per-row error list.
* **Upload / Download Permissions**: A `data_upload` right per user controls who may import CSV data and who may download templates, toggleable from Settings → Permissions. Admins always retain both.
* **Data Backup:** One-click export of the entire database to a single JSON file (`/api/backup`).

---

## 💻 Installation Steps on Windows

To set up and run the Sanitary ERP locally on a Windows machine, follow these steps:

### Prerequisites
1. **Node.js**: Download and install the latest LTS version of Node.js (version 18 or above) from [nodejs.org](https://nodejs.org/).
2. **PostgreSQL**: Download and install PostgreSQL (version 15, 16, or 17) from [enterprisedb.com](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
   - During installation, set a password for the default `postgres` user (e.g., `postgres`).
   - Create a blank database named `app_db` using pgAdmin or the SQL Shell:
     ```sql
     CREATE DATABASE app_db;
     ```

### Execution steps
1. **Clone or Extract Project**: Place the source code in a folder, e.g., `C:\projects\sanitary-erp`.
2. **Configure Environment Variables**:
   - Create a file named `.env` in the root folder with the following contents:
     ```env
     DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:5432/app_db
     SESSION_SECRET=a_very_long_secure_random_string_of_characters_here
     ```
3. **Install Dependencies**:
   - Open Command Prompt (`cmd`) or PowerShell in the project directory, and run:
     ```cmd
     npm install
     ```
4. **Push Database Schema**:
   - Synchronize the PostgreSQL database schema with your Drizzle configuration:
     ```cmd
     npx drizzle-kit push
     ```
5. **Start Development Server**:
   - Launch the local Next.js server:
     ```cmd
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:3000`.
6. **Production Build**:
   - To test the compiled production version locally:
     ```cmd
     npm run build
     npm run start
     ```

---

## 🌐 Installation Steps on Web (Production Server)

Follow this standard guide to deploy the ERP on a virtual private server (VPS) running Linux (Ubuntu/Debian) or a containerized system.

### Option A: Standard VPS deployment (Ubuntu, Nginx, PM2, PostgreSQL)

#### 1. Server Provisioning & PostgreSQL Setup
- Install Node.js, PostgreSQL, and Nginx on your VPS:
  ```bash
  sudo apt update
  sudo apt install -y nodejs npm postgresql postgresql-contrib nginx
  ```
- Configure PostgreSQL database & user:
  ```bash
  sudo -i -u postgres psql -c "CREATE DATABASE app_db;"
  sudo -i -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'secure_password';"
  ```

#### 2. Deploy Code & Environment Variables
- Pull code to `/var/www/sanitary-erp` and install packages:
  ```bash
  cd /var/www/sanitary-erp
  npm install
  ```
- Configure production `.env`:
  ```env
  DATABASE_URL=postgresql://postgres:secure_password@127.0.0.1:5432/app_db
  SESSION_SECRET=generate_a_secure_crypto_secret_for_sessions_here
  NODE_ENV=production
  PORT=3000
  ```
- Run schema migrations:
  ```bash
  npx drizzle-kit push
  ```

#### 3. Build & Process Management with PM2
- Build the Next.js application:
  ```bash
  npm run build
  ```
- Install PM2 process manager globally and start Next.js:
  ```bash
  sudo npm install -g pm2
  pm2 start npm --name "sanitary-erp" -- run start
  pm2 save
  pm2 startup
  ```

#### 4. Configure Nginx Reverse Proxy
- Configure `/etc/nginx/sites-available/default`:
  ```nginx
  server {
      listen 80;
      server_name erp.yourdomain.pk;

      location / {
          proxy_pass http://127.0.0.1:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```
- Restart Nginx:
  ```bash
  sudo systemctl restart nginx
  ```
- (Optional) Secure with free SSL certificate via Let's Encrypt Certbot:
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d erp.yourdomain.pk
  ```

### Option B: Deploying on Vercel + Neon Serverless Postgres
1. Push the code to a Git repository (GitHub/GitLab).
2. Connect Neon Serverless PostgreSQL or Supabase Postgres to get a database connection string.
3. Import the repository into the Vercel Dashboard.
4. Add environment variables `DATABASE_URL` and `SESSION_SECRET` in Vercel settings.
5. In your project settings, set the Build Command to:
   ```bash
   npx drizzle-kit push && next build
   ```
6. Deploy. Vercel automatically deploys the serverless edge handlers.

---

## 🛠️ Technical Details of the Software

### 1. Technology Stack
- **Framework**: Next.js 16 (App Router) — using React Server Components (RSC) and dynamic server-side API endpoints.
- **Language**: TypeScript 5 (Strict Mode).
- **Styling**: Tailwind CSS v4 — using advanced flex, grid, and transitions.
- **Database**: PostgreSQL 17.
- **ORM**: Drizzle ORM — lightweight, fully-typed SQL builder.
- **Client Networking**: Custom modular React hooks with built-in toast states and API reload triggers.
- **Searchable Combobox Component (`SearchSelect`)**: A shared, reusable type-ahead dropdown in the UI kit used by every long list (3,000+ items, chart of accounts, parties, invoice links). It does client-side keyword filtering, caps rendered rows at 500 for performance, closes on Escape and on outside click, and auto-focuses its search box when opened.
- **Auth**: High-security Node.js Cookie session middleware using `crypto` scrypt sync password hashing.

### 2. Pakistani Tax & Fiscal Math Mechanics
Let's trace how the system computes tax for an invoice:
$$\text{Gross Total} = \sum (\text{Qty} \times \text{Rate} \times (1 - \text{Line Discount}\%))$$
$$\text{Taxable Value} = \text{Gross Total} - \text{Discount Percentage} - \text{Discount Lumpsum} + \text{Transport} + \text{Labor}$$
$$\text{Sales Tax} = \text{Taxable Value} \times \text{Sales Tax Rate}\% \quad (\text{usually } 18\%)$$
$$\text{Further Tax} = \begin{cases} 
(\text{Taxable Value} + \text{Sales Tax}) \times \text{Further Tax Rate}\% & \text{if Buyer is Unregistered} \quad (\text{usually } 4\%) \\
0 & \text{if Buyer is Registered} 
\end{cases}$$
$$\text{Grand Total} = \text{Taxable Value} + \text{Sales Tax} + \text{Further Tax}$$
$$\text{Withholding AIT} = \text{Taxable Value} \times \text{Withholding Rate}\% \quad (\text{deducted from payment})$$
$$\text{Net Payable to Showroom} = \text{Grand Total} - \text{Withholding AIT}$$

### 3. Attachments & File Storage
- **Upload endpoint** (`POST /api/upload`, `multipart/form-data`) writes files to `public/uploads/<timestamp>_<name>` and returns the public path. Lists are stored as comma-separated URL strings, so one column holds any number of attachments (`items.pictures`, `items.documents`, `parties.documents`, `salesmen.pictures`, `salesmen.documents`, `documents.documents`, `vouchers.documents`).
- **Serving**: uploads are streamed by `/api/uploads/[file]` with correct MIME types and immutable caching. A `next.config.ts` rewrite maps `/uploads/:path*` to that route, because Next.js snapshots `public/` at build time and would 404 anything written afterwards.
- **Multi-file uploader** (`MultiFileUploader` / `MultiImageUploader`) selects many files at once, uploads them sequentially with progress, renders image thumbnails inline, and supports per-file removal. Used by all transaction forms, the item catalog (several angles per product), customers, vendors and salesmen.

### 4. Line-Level vs Invoice-Level Taxation
Tax moved from the invoice header onto each `document_lines` row, which now stores `item_type` (`goods` | `services`), `sales_tax_rate`, `sales_tax`, `further_tax_rate`, `further_tax` and `tax_exempt`. `computeLineTax()` evaluates one line: `taxable = (qty × rate) − line discount`, then `salesTax = taxable × lineRate%`, then `furtherTax = (taxable + salesTax) × furtherRate%` for unregistered buyers. `computeTotals()` simply sums the lines and adds invoice-level discount, transport and labor. This is what lets a single invoice carry 18% goods, 9% services and an exempt line at once. The invoice header keeps aggregate `salesTax` / `furtherTax` for reporting and the return working.

Per-line AIT resolution reads the buyer's filer status (Filer / Late Filer / Non-Filer) against the nine configured rates and prefers an explicit line-level override, so 153(1)(a) on a goods line and 153(1)(b) on a services line coexist correctly. The header retains an effective `aitRate` (total AIT ÷ subtotal) purely for display.

Walk-in buyer fields (`walkin_name`, `walkin_contact`, `walkin_phone`, `walkin_address`, `walkin_city`) live on `documents` so an unregistered counter sale still satisfies FBR tax-invoice requirements.

### 5. Collision-Proof Document Numbering
- Monthly-resetting numbers come from the `sequences(prefix, period)` table. `allocateNo()` now **self-heals**: if the counter is missing it recovers the highest existing number for that prefix and period; if the generated number already exists (counter lagging behind real data after a restore or manual edit) it re-derives from actual rows and bumps the counter. This removes the duplicate-key 500 that would otherwise block posting.

### 5. FBR Digital Invoicing Protocol
- **USIN Generation**: Generates an idempotent, unique transaction hash (`USIN`) for every document.
- **Payload Verification**: Pre-validates formatting (NTN, STRN, CNIC) and math checks against Rule 150Q standards.
- **Crypto-Signatures & QR**: Signs payloads with transaction metadata, issuing FBR validation markers (IRN) and generating scannable QR matrices pointing to the official FBR Verification portal.
