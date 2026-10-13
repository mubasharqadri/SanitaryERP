(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/docs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocManager",
    ()=>DocManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/erp.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const num = (v)=>v === null || v === undefined || v === "" ? 0 : Number(v) || 0;
const PARTY_TYPE = {
    QUOT: "customer",
    SO: "customer",
    SINV: "customer",
    POS: "customer",
    SRET: "customer",
    PO: "vendor",
    PINV: "vendor",
    PRET: "vendor"
};
const CONVERT = {
    QUOT: {
        target: "SINV",
        label: "➔ Sales Invoice"
    },
    SO: {
        target: "SINV",
        label: "➔ Sales Invoice"
    },
    PO: {
        target: "PINV",
        label: "➔ Purchase Invoice"
    }
};
const FBR_TYPES = [
    "SINV",
    "POS",
    "SRET"
];
const SALES_SIDE = [
    "QUOT",
    "SO",
    "SINV",
    "POS",
    "SRET"
];
function aitRate(tax, section, filer) {
    if (!tax || section === "none") return 0;
    const f = filer === "filer" ? "Filer" : filer === "late_filer" ? "Late" : "Non";
    const key = `ait${section === "goods" ? "Goods" : section === "services" ? "Services" : "Contract"}${f}`;
    return Number(tax[key] ?? 0);
}
const FILER_BADGE = {
    filer: "Filer ✓",
    late_filer: "Late Filer",
    non_filer: "Non-Filer"
};
function DocManager({ docType, title, icon, showConvert = true }) {
    _s();
    const { data, loading, reload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])(`/api/documents?type=${docType}`);
    const { data: partyData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])(`/api/parties?type=${PARTY_TYPE[docType] ?? "customer"}`);
    const { data: itemData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/items");
    const { data: whData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/admin?entity=warehouses");
    const { data: smData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/admin?entity=salesmen");
    const { data: taxData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/tax");
    const { data: coData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/admin?entity=companies");
    // Dynamic lookup of parent documents for return linking
    const parentType = docType === "SRET" ? "SINV,POS" : "PINV";
    const { data: invoiceLookup } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])(docType === "SRET" || docType === "PRET" ? `/api/documents?type=${parentType}` : null);
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editId, setEditId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [syncing, setSyncing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [h, setH] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        partyId: "",
        warehouseId: "",
        salesmanId: "",
        date: new Date().toISOString().slice(0, 10),
        discountPct: 0,
        discountLumpsum: 0,
        salesTaxRate: "",
        taxExempt: false,
        chargeFurtherTax: true,
        aitSection: "",
        aitRateOverride: "",
        buyerFilerStatus: "",
        transportCharges: 0,
        laborCharges: 0,
        paidAmount: 0,
        paymentMode: "credit",
        validUntil: "",
        notes: "",
        documents: "",
        linkedInvoiceId: "",
        walkinName: "",
        walkinContact: "",
        walkinPhone: "",
        walkinAddress: "",
        walkinCity: ""
    });
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const { msg, setMsg, toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const set = (k, v)=>setH((x)=>({
                ...x,
                [k]: v
            }));
    const tax = taxData?.settings;
    const isPurchase = docType === "PO" || docType === "PINV" || docType === "PRET";
    const party = (partyData?.parties ?? []).find((p)=>String(p.id) === h.partyId) ?? null;
    const filer = h.buyerFilerStatus || party?.filerStatus || "non_filer";
    const aitSection = h.aitSection || tax?.defaultAitSection || "goods";
    const stRate = h.taxExempt ? 0 : h.salesTaxRate !== "" ? Number(h.salesTaxRate) : Number(tax?.salesTaxRate ?? 18);
    // Filter linked invoice candidates to only those matching current party
    const filteredInvoices = (invoiceLookup?.documents ?? []).filter((d)=>!h.partyId || String(d.partyId) === h.partyId);
    // Per-line tax preview (mirrors the server exactly)
    const buyerRegistered = !!party?.salesTaxRegistered;
    const ftAllowed = !!tax?.enableFurtherTax && h.chargeFurtherTax && SALES_SIDE.includes(docType) && !buyerRegistered;
    const globalRate = h.taxExempt ? 0 : h.salesTaxRate !== "" ? Number(h.salesTaxRate) : Number(tax?.salesTaxRate ?? 18);
    const lineCalc = lines.map((l)=>{
        const g = l.qty * l.rate;
        const taxable = Math.round((g - g * (l.discountPct ?? 0) / 100) * 100) / 100;
        const exempt = !!l.taxExempt;
        const r = exempt ? 0 : l.salesTaxRate === undefined || l.salesTaxRate === "" ? globalRate : Number(l.salesTaxRate);
        const st = Math.round(taxable * r / 100 * 100) / 100;
        const fr = ftAllowed && !exempt && taxable > 0 ? Number(tax?.furtherTaxRate ?? 4) : 0;
        const ft = Math.round((taxable + st) * fr / 100 * 100) / 100;
        const sec = l.aitSection === "none" ? "none" : l.aitSection && l.aitSection !== "" ? l.aitSection : tax?.enableAit === false ? "none" : tax?.defaultAitSection ?? "goods";
        const ar = !sec || sec === "none" ? 0 : l.aitRate !== undefined && l.aitRate !== "" ? Number(l.aitRate) : aitRate(tax, sec, filer);
        const at = Math.round(taxable * ar / 100 * 100) / 100;
        return {
            taxable,
            st,
            ft,
            total: taxable + st + ft,
            ait: at
        };
    });
    const subtotal = lineCalc.reduce((a, c)=>a + c.taxable, 0);
    const afterPct = subtotal - subtotal * h.discountPct / 100 - h.discountLumpsum;
    const salesTax = lineCalc.reduce((a, c)=>a + c.st, 0);
    const furtherTax = lineCalc.reduce((a, c)=>a + c.ft, 0);
    const grand = Math.max(0, afterPct + salesTax + furtherTax + h.transportCharges + h.laborCharges);
    const goodsTax = lines.reduce((a, l, i)=>a + ((l.itemType || "goods") === "goods" ? lineCalc[i].st : 0), 0);
    const svcTax = lines.reduce((a, l, i)=>a + ((l.itemType || "goods") === "services" ? lineCalc[i].st : 0), 0);
    const svcTotal = lines.reduce((a, l, i)=>a + ((l.itemType || "goods") === "services" ? lineCalc[i].taxable : 0), 0);
    const aitTotal = lineCalc.reduce((a, c)=>a + c.ait, 0);
    const ftRate = ftAllowed ? Number(tax?.furtherTaxRate ?? 4) : 0;
    const aitR = !tax?.enableAit || aitSection === "none" ? 0 : h.aitRateOverride !== "" ? Number(h.aitRateOverride) : aitRate(tax, aitSection, filer);
    const aitAmt = Math.round(aitTotal * 100) / 100;
    const netPayable = Math.max(0, Math.round((grand - aitAmt) * 100) / 100);
    const defaultCompany = (coData?.rows ?? []).find((c)=>c.isDefault) ?? (coData?.rows ?? [])[0];
    function resetForm() {
        setEditId(null);
        setH({
            partyId: "",
            warehouseId: whData?.rows[0]?.id ? String(whData.rows[0].id) : "",
            salesmanId: "",
            date: new Date().toISOString().slice(0, 10),
            discountPct: 0,
            discountLumpsum: 0,
            salesTaxRate: "",
            taxExempt: false,
            chargeFurtherTax: true,
            aitSection: "",
            aitRateOverride: "",
            buyerFilerStatus: "",
            transportCharges: 0,
            laborCharges: 0,
            paidAmount: 0,
            paymentMode: "credit",
            validUntil: "",
            notes: "",
            documents: "",
            linkedInvoiceId: "",
            walkinName: "",
            walkinContact: "",
            walkinPhone: "",
            walkinAddress: "",
            walkinCity: ""
        });
        setLines([]);
        setShow(true);
    }
    async function triggerEdit(d) {
        if (d.fbrStatus === "synced") {
            return setMsg("!FBR-synced invoices cannot be edited.");
        }
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/documents?id=${d.id}`);
            setEditId(d.id);
            setH({
                partyId: res.document.partyId ? String(res.document.partyId) : "",
                warehouseId: res.document.warehouseId ? String(res.document.warehouseId) : "",
                salesmanId: res.document.salesmanId ? String(res.document.salesmanId) : "",
                date: String(res.document.date).slice(0, 10),
                discountPct: Number(res.document.discountPct),
                discountLumpsum: Number(res.document.discountLumpsum),
                salesTaxRate: res.document.salesTaxRate ? String(res.document.salesTaxRate) : "",
                taxExempt: Number(res.document.salesTax) === 0 && Number(res.document.grandTotal) > 0 && res.document.docType !== "QUOT" && res.document.docType !== "SO",
                chargeFurtherTax: Number(res.document.furtherTaxRate) > 0,
                aitSection: res.document.aitSection || "",
                aitRateOverride: res.document.aitRate ? String(res.document.aitRate) : "",
                buyerFilerStatus: res.document.buyerFilerStatus || "",
                transportCharges: Number(res.document.transportCharges),
                laborCharges: Number(res.document.laborCharges),
                paidAmount: Number(res.document.paidAmount),
                paymentMode: res.document.paymentMode || "credit",
                validUntil: res.document.validUntil ? String(res.document.validUntil).slice(0, 10) : "",
                notes: res.document.notes || "",
                documents: res.document.documents ?? "",
                linkedInvoiceId: res.document.linkedInvoiceId ? String(res.document.linkedInvoiceId) : "",
                walkinName: res.document.walkinName ?? "",
                walkinContact: res.document.walkinContact ?? "",
                walkinPhone: res.document.walkinPhone ?? "",
                walkinAddress: res.document.walkinAddress ?? "",
                walkinCity: res.document.walkinCity ?? ""
            });
            setLines(res.lines.map((l)=>({
                    ...l,
                    itemType: l.itemType ?? "goods",
                    taxExempt: !!l.taxExempt,
                    salesTaxRate: l.salesTaxRate ?? "",
                    aitSection: l.aitSection ?? "",
                    aitRate: l.aitRate ?? ""
                })));
            setShow(true);
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Load failed"));
        }
    }
    async function cancelDoc(id) {
        if (!confirm("Are you sure you want to Cancel this document? Stock ledger updates will be deleted, and vouchers will be set to Cancelled.")) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/documents`, {
                method: "PUT",
                body: JSON.stringify({
                    id,
                    action: "cancel"
                })
            });
            reload();
            setMsg("Document set to Cancelled ✓");
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Cancel failed"));
        }
    }
    async function save() {
        const usable = lines.filter((l)=>l.itemId || (l.description ?? "").trim() || num(l.qty) > 0 || num(l.rate) > 0);
        if (!usable.length) return setMsg("!Add at least one line item");
        const blankDropped = lines.length - usable.length;
        try {
            const isEdit = editId !== null;
            const endpoint = "/api/documents" + (isEdit ? `?id=${editId}` : "");
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(endpoint, {
                method: isEdit ? "PUT" : "POST",
                body: JSON.stringify({
                    id: editId,
                    header: {
                        ...h,
                        docType,
                        partyId: h.partyId || null,
                        warehouseId: h.warehouseId || null,
                        salesmanId: h.salesmanId || null,
                        salesTaxRate: h.salesTaxRate === "" ? undefined : Number(h.salesTaxRate),
                        taxExempt: h.taxExempt,
                        chargeFurtherTax: h.chargeFurtherTax,
                        buyerFilerStatus: h.buyerFilerStatus || undefined,
                        linkedInvoiceId: h.linkedInvoiceId || null,
                        walkinName: h.walkinName || null,
                        walkinContact: h.walkinContact || null,
                        walkinPhone: h.walkinPhone || null,
                        walkinAddress: h.walkinAddress || null,
                        walkinCity: h.walkinCity || null
                    },
                    lines: usable.map((l)=>({
                            ...l,
                            itemType: l.itemType || "goods",
                            taxExempt: !!l.taxExempt,
                            salesTaxRate: l.salesTaxRate === "" || l.salesTaxRate === undefined ? undefined : Number(l.salesTaxRate),
                            aitSection: l.aitSection || undefined,
                            aitRate: l.aitRate === "" || l.aitRate === undefined ? undefined : Number(l.aitRate)
                        }))
                })
            });
            setShow(false);
            setLines([]);
            reload();
            let m = `${isEdit ? "Updated" : "Saved"} ${res.document?.docNo ?? "Document"} ✓ Net payable Rs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(res.netPayable ?? grand)}`;
            if (blankDropped) m += ` · ${blankDropped} empty row(s) skipped`;
            if (res.fbr) m += res.fbr.ok ? ` · 📡 FBR ${res.fbr.fbrInvoiceNo} ✓` : ` · 📡 FBR failed: ${(res.fbr.errors ?? []).join("; ")}`;
            setMsg(m);
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Save failed"));
        }
    }
    async function syncFbr(id) {
        setSyncing(id);
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/fbr`, {
                method: "POST",
                body: JSON.stringify({
                    action: "sync",
                    documentId: id
                })
            });
            reload();
            if (view && view.document.id === id) setView(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/documents?id=${id}`));
            setMsg(`📡 Synced → ${res.fbrInvoiceNo} ✓${res.warnings?.length ? " · ⚠ " + res.warnings.join("; ") : ""}`);
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "FBR sync failed"));
            reload();
        } finally{
            setSyncing(null);
        }
    }
    async function convert(d) {
        const c = CONVERT[d.docType];
        if (!c) return;
        if (!confirm(`Convert ${d.docNo} to ${c.target}?`)) return;
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/documents", {
                method: "POST",
                body: JSON.stringify({
                    action: "convert",
                    id: d.id,
                    target: c.target
                })
            });
            reload();
            setMsg(`Created ${res.document.docNo} ✓`);
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Convert failed"));
        }
    }
    const partyName = (id)=>(partyData?.parties ?? []).find((p)=>p.id === id)?.name ?? (id ? "#" + id : "—");
    const isWalkin = !!party && party.name.toLowerCase().includes("walk-in");
    const isOnline = !!party && party.name.toLowerCase().includes("online");
    const isRet = docType === "SRET" || docType === "PRET";
    const showFbr = FBR_TYPES.includes(docType);
    // Attach up to 4 product photos of the invoiced items to the printed document
    const picturesOf = (ls)=>{
        const out = [];
        for (const l of ls){
            const it = (itemData?.items ?? []).find((i)=>i.id === l.itemId);
            if (it?.pictures) {
                for (const p of String(it.pictures).split(",").filter(Boolean))if (out.length < 4) out.push(p);
            }
        }
        return out;
    };
    // Searchable option lists (catalog can exceed 3000 items — native select is unusable)
    const itemOptions = (itemData?.items ?? []).map((i)=>({
            value: i.id,
            label: `${i.code} — ${i.name} (Stk: ${i.stock})`,
            keywords: `${i.code} ${i.name}`
        }));
    const partyOptions = (partyData?.parties ?? []).map((p)=>({
            value: p.id,
            label: `${p.name} [${FILER_BADGE[p.filerStatus] ?? p.filerStatus}${p.salesTaxRegistered ? ", ST-Reg" : ""}]`,
            keywords: `${p.name} ${p.ntn ?? ""} ${p.strn ?? ""} ${p.cnic ?? ""}`
        }));
    const invoiceOptions = filteredInvoices.map((inv)=>({
            value: inv.id,
            label: `${inv.docNo} (${String(inv.date).slice(0, 10)}) · Rs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(inv.grandTotal)}`,
            keywords: `${inv.docNo} ${partyName(inv.partyId)}`
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHead"], {
                title: `${icon} ${title}`,
                sub: `${data?.documents.length ?? 0} document(s) · Sales Tax 18% · Further Tax · AIT u/s 153 · FBR e-invoicing`,
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                    onClick: resetForm,
                    children: "+ New"
                }, void 0, false, {
                    fileName: "[project]/src/components/docs.tsx",
                    lineNumber: 275,
                    columnNumber: 18
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/docs.tsx",
                lineNumber: 274,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-500",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/src/components/docs.tsx",
                lineNumber: 276,
                columnNumber: 18
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                head: showFbr ? [
                    "Doc No",
                    "Date",
                    "Party",
                    "Linked Doc",
                    "Total",
                    "FBR Status",
                    "Status",
                    "Actions"
                ] : [
                    "Doc No",
                    "Date",
                    "Party",
                    "Linked Doc",
                    "Total",
                    "Status",
                    "Actions"
                ],
                children: (data?.documents ?? []).map((d)=>{
                    const parentNo = (invoiceLookup?.documents ?? []).find((i)=>i.id === d.linkedInvoiceId)?.docNo;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 font-mono text-xs font-bold",
                                children: d.docNo
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 282,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: String(d.date).slice(0, 10)
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 283,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: partyName(d.partyId)
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 284,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 text-xs font-semibold text-slate-500",
                                children: parentNo ? `⛓️ ${parentNo}` : "—"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 285,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 text-right font-bold",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(d.grandTotal)
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 286,
                                columnNumber: 17
                            }, this),
                            showFbr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FbrStatusBadge"], {
                                        status: d.fbrStatus
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 287,
                                        columnNumber: 55
                                    }, this),
                                    d.fbrInvoiceNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "font-mono text-[10px] text-slate-500",
                                        children: d.fbrInvoiceNo
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 287,
                                        columnNumber: 113
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 287,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    tone: d.status === "Cancelled" ? "red" : d.status === "Open" ? "amber" : "green",
                                    children: d.status
                                }, void 0, false, {
                                    fileName: "[project]/src/components/docs.tsx",
                                    lineNumber: 288,
                                    columnNumber: 43
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 288,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 text-right whitespace-nowrap space-x-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-indigo-600 hover:underline",
                                        onClick: async ()=>setView(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/documents?id=${d.id}`)),
                                        children: "👁 View"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 290,
                                        columnNumber: 19
                                    }, this),
                                    d.fbrStatus !== "synced" && d.status !== "Cancelled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-md border border-slate-300 px-1.5 py-0.5 text-xs font-bold text-slate-700 hover:bg-slate-100",
                                        onClick: ()=>triggerEdit(d),
                                        children: "✏️ Edit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 292,
                                        columnNumber: 21
                                    }, this),
                                    d.status !== "Cancelled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-amber-600 hover:underline",
                                        onClick: ()=>cancelDoc(d.id),
                                        children: "⊘ Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 295,
                                        columnNumber: 21
                                    }, this),
                                    showFbr && d.fbrStatus !== "synced" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        disabled: syncing === d.id,
                                        className: "text-xs font-semibold text-emerald-600 hover:underline disabled:opacity-50",
                                        onClick: ()=>syncFbr(d.id),
                                        children: syncing === d.id ? "…" : "FBR"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 298,
                                        columnNumber: 21
                                    }, this),
                                    showConvert && CONVERT[d.docType] && d.status !== "Invoiced" && d.status !== "Cancelled" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-emerald-600 hover:underline",
                                        onClick: ()=>convert(d),
                                        children: CONVERT[d.docType].label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 301,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "text-xs font-semibold text-rose-600 hover:underline",
                                        onClick: async ()=>{
                                            if (confirm(`Delete ${d.docNo}? Stock & ledger postings will be reversed.`)) {
                                                try {
                                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/documents?id=${d.id}`, {
                                                        method: "DELETE"
                                                    });
                                                    reload();
                                                } catch (e) {
                                                    setMsg("!" + (e instanceof Error ? e.message : "Delete failed"));
                                                }
                                            }
                                        },
                                        children: "Delete"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 303,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 289,
                                columnNumber: 17
                            }, this)
                        ]
                    }, d.id, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 281,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/docs.tsx",
                lineNumber: 277,
                columnNumber: 9
            }, this),
            show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                title: editId ? `Edit ${title} (${editId})` : `New ${title}`,
                onClose: ()=>setShow(false),
                full: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-3 sm:grid-cols-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mb-1 block text-xs font-medium text-slate-600",
                                                children: `Party ${party ? `· ${FILER_BADGE[party.filerStatus] ?? party.filerStatus} · ${party.salesTaxRegistered ? "ST-Registered" : "Unregistered"}` : ""}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 316,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchSelect"], {
                                                value: h.partyId,
                                                onChange: (v)=>set("partyId", v),
                                                options: partyOptions,
                                                placeholder: "🔍 Search customer / vendor…",
                                                searchPlaceholder: "Type name, NTN or CNIC…",
                                                emptyText: "No party matches your search"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this),
                                    (docType === "SRET" || docType === "PRET") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mb-1 block text-xs font-medium text-slate-600",
                                                children: `Link to ${docType === "SRET" ? "Sales" : "Purchase"} Invoice`
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 331,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchSelect"], {
                                                value: h.linkedInvoiceId,
                                                onChange: (v)=>set("linkedInvoiceId", v),
                                                options: invoiceOptions,
                                                placeholder: "— Without Invoice —",
                                                searchPlaceholder: "Type invoice no…",
                                                emptyText: "No invoice found for this party"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 330,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Date",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.date,
                                            onChange: (e)=>set("date", e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 345,
                                            columnNumber: 35
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Warehouse",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.warehouseId,
                                            onChange: (e)=>set("warehouseId", e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 17
                                                }, this),
                                                (whData?.rows ?? []).map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: w.id,
                                                        children: w.name
                                                    }, w.id, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 347,
                                                        columnNumber: 77
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 346,
                                            columnNumber: 40
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 346,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Salesman",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.salesmanId,
                                            onChange: (e)=>set("salesmanId", e.target.value),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "",
                                                    children: "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 350,
                                                    columnNumber: 17
                                                }, this),
                                                (smData?.rows ?? []).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: s.id,
                                                        children: s.name
                                                    }, s.id, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 350,
                                                        columnNumber: 77
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 349,
                                            columnNumber: 39
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 349,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `rounded-xl border p-3 ${isWalkin ? "border-amber-300 bg-amber-50/60" : "border-slate-200 bg-slate-50/60"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-slate-800",
                                                children: isWalkin ? "🚶 Walk-in Customer — capture details (required for the tax invoice)" : "🪪 Registered Party Details (from customer record)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            isOnline && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-indigo-100 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700",
                                                children: "🛒 Online Order"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 361,
                                                columnNumber: 30
                                            }, this),
                                            !isWalkin && party?.salesTaxRegistered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700",
                                                children: "ST Registered"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 362,
                                                columnNumber: 60
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    isWalkin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2 sm:grid-cols-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Name *",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: "Buyer name",
                                                    value: h.walkinName,
                                                    onChange: (e)=>set("walkinName", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 367,
                                                    columnNumber: 41
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 367,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Contact Person",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: "Contact person",
                                                    value: h.walkinContact,
                                                    onChange: (e)=>set("walkinContact", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 49
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 368,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Contact No.",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: "03xx-xxxxxxx",
                                                    value: h.walkinPhone,
                                                    onChange: (e)=>set("walkinPhone", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 369,
                                                    columnNumber: 46
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Address",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: "Street / area",
                                                    value: h.walkinAddress,
                                                    onChange: (e)=>set("walkinAddress", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 370,
                                                    columnNumber: 42
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 370,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "City",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: "City",
                                                    value: h.walkinCity,
                                                    onChange: (e)=>set("walkinCity", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 371,
                                                    columnNumber: 39
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 371,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 366,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-2 text-xs sm:grid-cols-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] uppercase text-slate-400",
                                                        children: "Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 24
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-slate-800",
                                                        children: party?.name ?? "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 375,
                                                        columnNumber: 96
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 375,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] uppercase text-slate-400",
                                                        children: "Contact Person"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 24
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-slate-800",
                                                        children: party?.name ?? "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 376,
                                                        columnNumber: 106
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 376,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] uppercase text-slate-400",
                                                        children: "Contact No."
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 24
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-slate-800",
                                                        children: party?.mobile || party?.phone || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 103
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 377,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] uppercase text-slate-400",
                                                        children: "Address"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 24
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-slate-800",
                                                        children: [
                                                            party?.area,
                                                            party?.city
                                                        ].filter(Boolean).join(", ") || "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 99
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 378,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "block text-[10px] uppercase text-slate-400",
                                                        children: "City"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 24
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-slate-800",
                                                        children: party?.city ?? "—"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 379,
                                                        columnNumber: 96
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 374,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MultiFileUploader"], {
                                label: "Attached Documents — delivery challan, signed copy, gate pass, scanned approval",
                                value: h.documents,
                                onChange: (urls)=>setH({
                                        ...h,
                                        documents: urls
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 384,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 rounded-xl bg-slate-50 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-2 flex flex-wrap items-center justify-between gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-bold text-slate-800",
                                                children: "Line Items"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 388,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] font-normal text-slate-400",
                                                children: [
                                                    lines.length,
                                                    " line(s) · click any cell to edit · TAB moves across"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 389,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 387,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto rounded-xl border border-slate-200 bg-white",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full min-w-[1180px] text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "bg-slate-50 text-left text-[10px] uppercase tracking-wide text-slate-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold",
                                                                style: {
                                                                    width: 34
                                                                },
                                                                children: "#"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 395,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold",
                                                                style: {
                                                                    minWidth: 230
                                                                },
                                                                children: "Item *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 396,
                                                                columnNumber: 23
                                                            }, this),
                                                            isRet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold",
                                                                style: {
                                                                    width: 112
                                                                },
                                                                children: "Condition"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 397,
                                                                columnNumber: 33
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold",
                                                                style: {
                                                                    width: 108
                                                                },
                                                                children: "Type"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 72
                                                                },
                                                                children: "Qty"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 399,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 100
                                                                },
                                                                children: "Rate"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 64
                                                                },
                                                                children: "Disc%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 70
                                                                },
                                                                children: "ST %"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 402,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 92
                                                                },
                                                                children: "ST Amt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold",
                                                                style: {
                                                                    width: 118
                                                                },
                                                                children: "AIT §153"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 404,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 72
                                                                },
                                                                children: "AIT %"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 405,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 84
                                                                },
                                                                children: "AIT Amt"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 406,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2 font-semibold text-right",
                                                                style: {
                                                                    width: 104
                                                                },
                                                                children: "Amount"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "px-2 py-2",
                                                                style: {
                                                                    width: 34
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 408,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 393,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    className: "divide-y divide-slate-100",
                                                    children: [
                                                        lines.map((l, i)=>{
                                                            const g = l.qty * l.rate;
                                                            const amt = g - g * (l.discountPct ?? 0) / 100;
                                                            const patch = (p)=>setLines(lines.map((x, xi)=>xi === i ? {
                                                                        ...x,
                                                                        ...p
                                                                    } : x));
                                                            const num2 = (n)=>n ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(n) : "—";
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                                className: "hover:bg-indigo-50/30",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-2 py-1 text-center text-[11px] text-slate-400",
                                                                        children: i + 1
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 419,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchSelect"], {
                                                                            value: l.itemId ?? "",
                                                                            onChange: (v)=>{
                                                                                const it = (itemData?.items ?? []).find((x)=>String(x.id) === v);
                                                                                patch({
                                                                                    itemId: it ? it.id : null,
                                                                                    description: it ? `${it.code} — ${it.name}` : l.description,
                                                                                    rate: l.rate || (it ? Number(isPurchase ? it.costPrice : it.salePrice) : 0)
                                                                                });
                                                                            },
                                                                            options: itemOptions,
                                                                            placeholder: "🔍 Search item…",
                                                                            searchPlaceholder: "Type code / name / brand…",
                                                                            emptyText: "No item matches"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 421,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 420,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    isRet && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-[13px]`,
                                                                            value: l.returnCondition || "normal",
                                                                            onChange: (e)=>patch({
                                                                                    returnCondition: e.target.value
                                                                                }),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "normal",
                                                                                    children: "😇 Normal"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 436,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "damaged",
                                                                                    children: "⚠️ Damaged"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 437,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "broken",
                                                                                    children: "💔 Broken"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 438,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 435,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 434,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-[13px]`,
                                                                            value: l.itemType || "goods",
                                                                            onChange: (e)=>patch({
                                                                                    itemType: e.target.value
                                                                                }),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "goods",
                                                                                    children: "📦 Goods"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 444,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "services",
                                                                                    children: "🛠️ Services"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 445,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 443,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 442,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 0,
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-right`,
                                                                            value: l.qty,
                                                                            onChange: (e)=>patch({
                                                                                    qty: Number(e.target.value)
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 449,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 448,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 0,
                                                                            step: "0.01",
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-right`,
                                                                            value: l.rate,
                                                                            onChange: (e)=>patch({
                                                                                    rate: Number(e.target.value)
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 452,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 451,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 0,
                                                                            max: 100,
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-right`,
                                                                            value: l.discountPct ?? 0,
                                                                            onChange: (e)=>patch({
                                                                                    discountPct: Number(e.target.value)
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 455,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 454,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 0,
                                                                            step: "0.01",
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-right`,
                                                                            placeholder: String(globalRate),
                                                                            value: l.salesTaxRate ?? "",
                                                                            onChange: (e)=>patch({
                                                                                    salesTaxRate: e.target.value === "" ? undefined : Number(e.target.value)
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 458,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 457,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1 text-right text-[13px] text-amber-700",
                                                                        children: num2(Math.round(lineCalc[i]?.st ?? 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 460,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-[13px]`,
                                                                            value: l.aitSection ?? "",
                                                                            onChange: (e)=>patch({
                                                                                    aitSection: e.target.value
                                                                                }),
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "",
                                                                                    children: "Auto"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 463,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "goods",
                                                                                    children: "153(a)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 464,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "services",
                                                                                    children: "153(b)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 465,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "contract",
                                                                                    children: "153(c)"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 466,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: "none",
                                                                                    children: "None"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                                    lineNumber: 467,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 462,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 461,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "number",
                                                                            min: 0,
                                                                            step: "0.01",
                                                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"]} text-right`,
                                                                            placeholder: "auto",
                                                                            value: l.aitRate ?? "",
                                                                            onChange: (e)=>patch({
                                                                                    aitRate: e.target.value === "" ? undefined : Number(e.target.value)
                                                                                })
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 471,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 470,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1 text-right text-[13px] font-semibold text-rose-700",
                                                                        children: num2(Math.round(lineCalc[i]?.ait ?? 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 473,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1 text-right text-[13px] font-bold",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(amt)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                        className: "px-1 py-1 text-center",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            title: "Remove line",
                                                                            className: "font-bold text-rose-500 hover:text-rose-700",
                                                                            onClick: ()=>setLines(lines.filter((_, x)=>x !== i)),
                                                                            children: "✕"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/docs.tsx",
                                                                            lineNumber: 476,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/docs.tsx",
                                                                        lineNumber: 475,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, i, true, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 418,
                                                                columnNumber: 25
                                                            }, this);
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "bg-slate-50/70",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                colSpan: isRet ? 14 : 13,
                                                                className: "p-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setLines([
                                                                            ...lines,
                                                                            {
                                                                                itemId: null,
                                                                                description: "",
                                                                                qty: 1,
                                                                                unit: "PCS",
                                                                                rate: 0,
                                                                                discountPct: 0,
                                                                                returnCondition: "normal",
                                                                                itemType: "goods",
                                                                                taxExempt: false
                                                                            }
                                                                        ]),
                                                                    className: "rounded-lg border border-dashed border-indigo-300 px-3 py-1.5 text-xs font-bold text-indigo-600 hover:bg-indigo-50",
                                                                    children: "+ Add line"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/docs.tsx",
                                                                    lineNumber: 483,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/docs.tsx",
                                                                lineNumber: 482,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/docs.tsx",
                                                            lineNumber: 481,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 411,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 386,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl border border-emerald-200 bg-emerald-50/60 p-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-1 text-sm font-bold text-emerald-900",
                                        children: "🇵🇰 Pakistan Taxes — Sales Tax Act 1990 · Income Tax Ord. s.153"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-2 text-[11px] text-emerald-800",
                                        children: [
                                            "Sales Tax %, Item Type, Exempt and ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "AIT u/s 153"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 497,
                                                columnNumber: 52
                                            }, this),
                                            " are set ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: "per line item"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 497,
                                                columnNumber: 79
                                            }, this),
                                            " in the grid below (so goods and services can be taxed differently on one invoice). The fields here only set the",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: " default rate"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 499,
                                                columnNumber: 17
                                            }, this),
                                            "applied to new lines and the counterparty's filer status."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 sm:grid-cols-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: `Default Sales Tax % (std ${tax?.salesTaxRate ?? 18})`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.01",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    placeholder: `Default ${tax?.salesTaxRate ?? 18}`,
                                                    value: h.salesTaxRate,
                                                    onChange: (e)=>set("salesTaxRate", e.target.value)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 502,
                                                    columnNumber: 87
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: `Buyer Filer Status (auto: ${FILER_BADGE[filer] ?? filer})`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    value: h.buyerFilerStatus,
                                                    onChange: (e)=>set("buyerFilerStatus", e.target.value),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "",
                                                            children: "Auto from party"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/docs.tsx",
                                                            lineNumber: 504,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "filer",
                                                            children: "Filer (ATL)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/docs.tsx",
                                                            lineNumber: 505,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "late_filer",
                                                            children: "Late Filer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/docs.tsx",
                                                            lineNumber: 506,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "non_filer",
                                                            children: "Non-Filer"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/docs.tsx",
                                                            lineNumber: 507,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 503,
                                                    columnNumber: 92
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                                label: "Further Tax (automatic)",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                                    readOnly: true,
                                                    disabled: true,
                                                    value: ftAllowed && !h.taxExempt ? `${tax?.furtherTaxRate ?? 4}% u/s 3(1A) applies — buyer unregistered` : "Not applicable — buyer registered / exempt"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 509,
                                                    columnNumber: 56
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 509,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 501,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 grid gap-3 sm:grid-cols-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Discount %",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.discountPct,
                                            onChange: (e)=>set("discountPct", Number(e.target.value))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 514,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 514,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Discount (lump-sum)",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.discountLumpsum,
                                            onChange: (e)=>set("discountLumpsum", Number(e.target.value))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 515,
                                            columnNumber: 50
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Transport Charges",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.transportCharges,
                                            onChange: (e)=>set("transportCharges", Number(e.target.value))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 516,
                                            columnNumber: 48
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Labor Charges",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.laborCharges,
                                            onChange: (e)=>set("laborCharges", Number(e.target.value))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 517,
                                            columnNumber: 44
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 517,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Paid Now",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.paidAmount,
                                            onChange: (e)=>set("paidAmount", Number(e.target.value))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 518,
                                            columnNumber: 39
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 518,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Payment Mode",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.paymentMode,
                                            onChange: (e)=>set("paymentMode", e.target.value),
                                            children: [
                                                "cash",
                                                "bank",
                                                "card",
                                                "online",
                                                "cheque",
                                                "credit"
                                            ].map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: m,
                                                    children: m
                                                }, m, false, {
                                                    fileName: "[project]/src/components/docs.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 84
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 519,
                                            columnNumber: 43
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 519,
                                        columnNumber: 15
                                    }, this),
                                    docType === "QUOT" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Valid Until",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.validUntil,
                                            onChange: (e)=>set("validUntil", e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 522,
                                            columnNumber: 67
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 522,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                        label: "Notes",
                                        span: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                            value: h.notes,
                                            onChange: (e)=>set("notes", e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 523,
                                            columnNumber: 41
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 513,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 rounded-xl bg-indigo-50 p-3 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap justify-end gap-x-4 gap-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Subtotal ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(Math.round((afterPct + h.transportCharges + h.laborCharges) * 100) / 100)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 527,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 527,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-600",
                                                children: [
                                                    "📦 Goods ST ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(goodsTax)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 528,
                                                        columnNumber: 62
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-600",
                                                children: [
                                                    "🛠️ Services (",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(svcTotal),
                                                    ") ST ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(svcTax)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 529,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 529,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Sales Tax total ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(Math.round(salesTax * 100) / 100)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 39
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 530,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Further Tax (",
                                                    ftRate,
                                                    "%) ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(furtherTax)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 47
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 531,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 526,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1 flex flex-wrap items-center justify-end gap-x-4 gap-y-1 border-t border-indigo-200 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Grand Total ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-lg text-indigo-700",
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(Math.round(grand * 100) / 100)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 534,
                                                        columnNumber: 35
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 534,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Less AIT ",
                                                    aitSection,
                                                    " (",
                                                    aitR,
                                                    "%, ",
                                                    FILER_BADGE[filer] ?? filer,
                                                    ") ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-rose-600",
                                                        children: [
                                                            "−Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(aitAmt)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 86
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 535,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Net Payable ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        className: "text-lg text-emerald-700",
                                                        children: [
                                                            "Rs ",
                                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(netPayable)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/docs.tsx",
                                                        lineNumber: 536,
                                                        columnNumber: 35
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/docs.tsx",
                                                lineNumber: 536,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 533,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 525,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 313,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                tone: "ghost",
                                onClick: ()=>setShow(false),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 540,
                                columnNumber: 56
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                tone: "success",
                                onClick: save,
                                children: "💾 Save & Post"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 540,
                                columnNumber: 117
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 540,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/docs.tsx",
                lineNumber: 312,
                columnNumber: 9
            }, this),
            view && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                title: `${view.document.docType} ${view.document.docNo}`,
                onClose: ()=>setView(null),
                full: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-print mb-3 flex flex-wrap items-center gap-2",
                        children: [
                            FBR_TYPES.includes(view.document.docType) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FbrStatusBadge"], {
                                status: view.document.fbrStatus
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 547,
                                columnNumber: 59
                            }, this),
                            view.document.fbrInvoiceNo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-xs text-slate-600",
                                children: [
                                    "IRN: ",
                                    view.document.fbrInvoiceNo,
                                    " · USIN: ",
                                    view.document.fbrUsin
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 548,
                                columnNumber: 44
                            }, this),
                            FBR_TYPES.includes(view.document.docType) && view.document.fbrStatus !== "synced" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                small: true,
                                tone: "success",
                                onClick: ()=>syncFbr(view.document.id),
                                children: "📡 Sync to FBR"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 550,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 546,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PrintDoc"], {
                        title: `${title} — ${view.document.docNo}`,
                        head: [
                            [
                                "Date",
                                String(view.document.date).slice(0, 10)
                            ],
                            [
                                "Party",
                                isWalkin ? view.document.walkinName || "Walk-in Customer" : partyName(view.document.partyId)
                            ],
                            [
                                "Payment",
                                view.document.paymentMode
                            ],
                            [
                                "Status",
                                view.document.status
                            ],
                            ...!isWalkin ? [
                                [
                                    "Filer",
                                    FILER_BADGE[view.document.buyerFilerStatus ?? ""] ?? view.document.buyerFilerStatus ?? "—"
                                ]
                            ] : [],
                            ...view.document.walkinContact ? [
                                [
                                    "Contact",
                                    `${view.document.walkinContact}${view.document.walkinPhone ? " · " + view.document.walkinPhone : ""}`
                                ]
                            ] : [],
                            ...view.document.walkinAddress || view.document.walkinCity ? [
                                [
                                    "Address",
                                    [
                                        view.document.walkinAddress,
                                        view.document.walkinCity
                                    ].filter(Boolean).join(", ")
                                ]
                            ] : []
                        ],
                        lines: view.lines.map((l)=>({
                                desc: l.returnCondition && l.returnCondition !== "normal" ? `${l.description ?? ""} [Cond: ${l.returnCondition.toUpperCase()}]` : l.description ?? "",
                                qty: Number(l.qty),
                                rate: Number(l.rate),
                                amt: Number(l.amount)
                            })),
                        totals: [
                            /* --- charges & taxes: zero-value lines are hidden entirely --- */ ...Number(view.document.discountPct) > 0 || Number(view.document.discountLumpsum) > 0 ? [
                                [
                                    "Discount",
                                    `${view.document.discountPct}% + Rs ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.discountLumpsum)}`
                                ]
                            ] : [],
                            ...Number(view.document.salesTax) > 0 ? [
                                [
                                    `Sales Tax`,
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.salesTax)
                                ]
                            ] : [],
                            ...Number(view.document.furtherTax) > 0 ? [
                                [
                                    `Further Tax u/s 3(1A)`,
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.furtherTax)
                                ]
                            ] : [],
                            ...Number(view.document.transportCharges) > 0 ? [
                                [
                                    "Transport Charges",
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.transportCharges)
                                ]
                            ] : [],
                            ...Number(view.document.laborCharges) > 0 ? [
                                [
                                    "Labor Charges",
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.laborCharges)
                                ]
                            ] : [],
                            ...Number(view.document.aitAmount) > 0 ? [
                                [
                                    `Less AIT u/s 153 (withholding)`,
                                    "−Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.aitAmount)
                                ]
                            ] : [],
                            [
                                "Grand Total",
                                "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.grandTotal)
                            ],
                            ...Number(view.document.paidAmount) > 0 ? [
                                [
                                    "Paid",
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(view.document.paidAmount)
                                ]
                            ] : [],
                            ...Number(view.document.grandTotal) - Number(view.document.paidAmount) > 0 ? [
                                [
                                    "Balance Due",
                                    "Rs " + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(Number(view.document.grandTotal) - Number(view.document.paidAmount))
                                ]
                            ] : []
                        ],
                        company: defaultCompany ? {
                            name: defaultCompany.name,
                            ntn: defaultCompany.ntn,
                            strn: defaultCompany.strn
                        } : null,
                        showFooter: [
                            "SINV",
                            "SO"
                        ].includes(view.document.docType),
                        pictures: picturesOf(view.lines)
                    }, void 0, false, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 553,
                        columnNumber: 11
                    }, this),
                    view.document.documents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-xl border p-4 bg-slate-50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-xs text-slate-800 mb-2",
                                children: "📁 Attached Supporting Documentation & Gate Passes"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 593,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-3",
                                children: view.document.documents.split(",").filter(Boolean).map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: url,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "flex items-center gap-2 bg-white rounded-lg border px-3 py-2 text-xs font-semibold text-indigo-700 hover:bg-slate-100 shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "📄 Supporting File ",
                                                idx + 1
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/docs.tsx",
                                            lineNumber: 597,
                                            columnNumber: 21
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/src/components/docs.tsx",
                                        lineNumber: 596,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 594,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 592,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-print mt-3 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                tone: "ghost",
                                onClick: ()=>window.print(),
                                children: "🖨️ Print"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 605,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                onClick: ()=>setView(null),
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/docs.tsx",
                                lineNumber: 606,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/docs.tsx",
                        lineNumber: 604,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/docs.tsx",
                lineNumber: 545,
                columnNumber: 9
            }, this),
            toast
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/docs.tsx",
        lineNumber: 273,
        columnNumber: 5
    }, this);
}
_s(DocManager, "9/r63Lxv6H9BHC8GYgKS7UGoKbg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = DocManager;
var _c;
__turbopack_context__.k.register(_c, "DocManager");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_docs_tsx_0-7tpwa._.js.map