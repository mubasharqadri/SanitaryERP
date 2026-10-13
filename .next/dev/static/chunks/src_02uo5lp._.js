(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/erp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalyticalDialog",
    ()=>AnalyticalDialog,
    "AnalyticalField",
    ()=>AnalyticalField,
    "Badge",
    ()=>Badge,
    "Btn",
    ()=>Btn,
    "Card",
    ()=>Card,
    "DEPARTMENTS",
    ()=>DEPARTMENTS,
    "FbrStamp",
    ()=>FbrStamp,
    "FbrStatusBadge",
    ()=>FbrStatusBadge,
    "Field",
    ()=>Field,
    "FileUploader",
    ()=>FileUploader,
    "LetterheadPrintWrapper",
    ()=>LetterheadPrintWrapper,
    "LogoutButton",
    ()=>LogoutButton,
    "Modal",
    ()=>Modal,
    "MultiFileUploader",
    ()=>MultiFileUploader,
    "MultiImageUploader",
    ()=>MultiImageUploader,
    "PageHead",
    ()=>PageHead,
    "PicUploader",
    ()=>PicUploader,
    "PrintDoc",
    ()=>PrintDoc,
    "SearchInput",
    ()=>SearchInput,
    "SearchSelect",
    ()=>SearchSelect,
    "Stat",
    ()=>Stat,
    "Table",
    ()=>Table,
    "Toast",
    ()=>Toast,
    "api",
    ()=>api,
    "inputCls",
    ()=>inputCls,
    "money",
    ()=>money,
    "useApi",
    ()=>useApi,
    "useLetterhead",
    ()=>useLetterhead,
    "useToast",
    ()=>useToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature(), _s11 = __turbopack_context__.k.signature(), _s12 = __turbopack_context__.k.signature(), _s13 = __turbopack_context__.k.signature();
"use client";
;
;
async function api(url, opts) {
    const res = await fetch(url, {
        ...opts,
        headers: {
            "Content-Type": "application/json",
            ...opts?.headers ?? {}
        }
    });
    const data = await res.json().catch(()=>({}));
    if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
    return data;
}
function useApi(url, deps = []) {
    _s();
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const reload = async ()=>{
        if (!url) return;
        setLoading(true);
        try {
            setData(await api(url));
            setError("");
        } catch (e) {
            setError(e instanceof Error ? e.message : "Load failed");
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useApi.useEffect": ()=>{
            reload(); // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useApi.useEffect"], deps);
    return {
        data,
        loading,
        error,
        reload,
        setData
    };
}
_s(useApi, "Q41jxyh8yTWlcYd1EzsDAH7xR/w=");
function money(v) {
    const n = Number(v);
    if (!Number.isFinite(n)) return "0.00";
    return n.toLocaleString("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function PageHead({ title, sub, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-5 flex flex-wrap items-end justify-between gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold text-slate-900",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    sub && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-slate-500",
                        children: sub
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 38,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-2",
                children: actions
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_c = PageHead;
function Card({ children, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_c1 = Card;
function Stat({ label, value, icon, tone = "slate" }) {
    const tones = {
        slate: "bg-slate-100 text-slate-700",
        emerald: "bg-emerald-100 text-emerald-700",
        amber: "bg-amber-100 text-amber-700",
        rose: "bg-rose-100 text-rose-700",
        indigo: "bg-indigo-100 text-indigo-700",
        sky: "bg-sky-100 text-sky-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `grid h-11 w-11 place-items-center rounded-lg text-xl ${tones[tone] ?? tones.slate}`,
                    children: icon
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-medium uppercase tracking-wide text-slate-500",
                            children: label
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 59,
                            columnNumber: 14
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xl font-bold text-slate-900",
                            children: value
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 60,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/erp.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
_c2 = Stat;
function Btn({ children, onClick, tone = "primary", type = "button", disabled, small }) {
    const tones = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700",
        ghost: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50",
        danger: "bg-rose-600 text-white hover:bg-rose-700",
        success: "bg-emerald-600 text-white hover:bg-emerald-700",
        amber: "bg-amber-500 text-white hover:bg-amber-600"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        disabled: disabled,
        onClick: onClick,
        className: `rounded-lg font-medium transition disabled:opacity-50 ${small ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${tones[tone]}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c3 = Btn;
function Field({ label, children, span }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: `block ${span ? "sm:col-span-2" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 block text-xs font-medium text-slate-600",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c4 = Field;
const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";
function SearchInput({ value, onChange, placeholder }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        value: value,
        onChange: (e)=>onChange(e.target.value),
        placeholder: placeholder ?? "Search…",
        className: `${inputCls} max-w-xs`
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c5 = SearchInput;
function SearchSelect({ value, onChange, options, placeholder = "— Select —", searchPlaceholder = "Type to search…", disabled = false, emptyText = "No matches found" }) {
    _s1();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const wrapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const selected = options.find((o)=>String(o.value) === String(value));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchSelect.useEffect": ()=>{
            function onDocClick(e) {
                if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
            }
            function onKey(e) {
                if (e.key === "Escape") setOpen(false);
            }
            document.addEventListener("mousedown", onDocClick);
            document.addEventListener("keydown", onKey);
            return ({
                "SearchSelect.useEffect": ()=>{
                    document.removeEventListener("mousedown", onDocClick);
                    document.removeEventListener("keydown", onKey);
                }
            })["SearchSelect.useEffect"];
        }
    }["SearchSelect.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchSelect.useEffect": ()=>{
            if (!open) return;
            setQuery("");
            const t = setTimeout({
                "SearchSelect.useEffect.t": ()=>inputRef.current?.focus()
            }["SearchSelect.useEffect.t"], 30);
            return ({
                "SearchSelect.useEffect": ()=>clearTimeout(t)
            })["SearchSelect.useEffect"];
        }
    }["SearchSelect.useEffect"], [
        open
    ]);
    const q = query.trim().toLowerCase();
    const filtered = q ? options.filter((o)=>`${o.label} ${o.keywords ?? ""}`.toLowerCase().includes(q)) : options;
    const visible = filtered.slice(0, 500);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        ref: wrapRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: disabled,
                onClick: ()=>setOpen((o)=>!o),
                className: `${inputCls} flex items-center justify-between gap-2 text-left ${disabled ? "opacity-60" : "cursor-pointer"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `truncate ${selected ? "text-slate-900" : "text-slate-400"}`,
                        children: selected?.label ?? placeholder
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "shrink-0 text-[10px] text-slate-400",
                        children: open ? "▲" : "▼"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 169,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            open && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 right-0 z-[70] mt-1 rounded-xl border border-slate-300 bg-white p-2 shadow-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        value: query,
                        onChange: (e)=>setQuery(e.target.value),
                        placeholder: searchPlaceholder,
                        className: "mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-h-56 overflow-y-auto",
                        children: [
                            visible.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-3 text-center text-xs text-slate-400",
                                children: emptyText
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 182,
                                columnNumber: 38
                            }, this),
                            visible.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        onChange(String(o.value));
                                        setOpen(false);
                                    },
                                    className: `block w-full truncate rounded-lg px-2.5 py-1.5 text-left text-sm ${String(o.value) === String(value) ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-100"}`,
                                    children: o.label
                                }, String(o.value), false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this)),
                            filtered.length > 500 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-2 text-center text-[11px] text-slate-400",
                                children: [
                                    "Showing 500 of ",
                                    filtered.length,
                                    " — keep typing to narrow down"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 195,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 181,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 173,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s1(SearchSelect, "QueJV46hLJb5Anf8epjjUtNxjl0=");
_c6 = SearchSelect;
function Table({ head, children, empty }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "w-full min-w-[640px] text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500",
                            children: head.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-3 py-2.5 font-semibold",
                                    children: h
                                }, h, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 212,
                                    columnNumber: 30
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 211,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        className: "divide-y divide-slate-100",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            empty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-8 text-center text-sm text-slate-400",
                children: empty
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 219,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 208,
        columnNumber: 5
    }, this);
}
_c7 = Table;
function Badge({ children, tone = "slate" }) {
    const tones = {
        slate: "bg-slate-100 text-slate-700",
        green: "bg-emerald-100 text-emerald-700",
        red: "bg-rose-100 text-rose-700",
        amber: "bg-amber-100 text-amber-800",
        blue: "bg-sky-100 text-sky-700"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 229,
        columnNumber: 10
    }, this);
}
_c8 = Badge;
function Modal({ title, onClose, children, wide, full }) {
    const width = full ? "max-w-[1800px] w-[97vw]" : wide ? "max-w-5xl" : "max-w-2xl";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-2 sm:p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: `my-4 sm:my-8 w-full rounded-2xl bg-white shadow-2xl ${width}`,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-white px-5 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-lg font-bold text-slate-900",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 239,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `${full ? "max-h-[calc(100vh-6rem)]" : "max-h-[75vh]"} overflow-y-auto p-4 sm:p-5`,
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/erp.tsx",
            lineNumber: 237,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_c9 = Modal;
function Toast({ msg, onDone }) {
    _s2();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Toast.useEffect": ()=>{
            const t = setTimeout(onDone, 3500);
            return ({
                "Toast.useEffect": ()=>clearTimeout(t)
            })["Toast.useEffect"];
        }
    }["Toast.useEffect"]);
    if (!msg) return null;
    const isErr = msg.startsWith("!");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-2xl ${isErr ? "bg-rose-600 text-white" : "bg-slate-900 text-white"}`,
        children: isErr ? msg.slice(1) : msg
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 253,
        columnNumber: 5
    }, this);
}
_s2(Toast, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c10 = Toast;
function FbrStatusBadge({ status }) {
    if (status === "synced") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        tone: "green",
        children: "📡 FBR ✓ Synced"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 269,
        columnNumber: 35
    }, this);
    if (status === "failed") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        tone: "red",
        children: "📡 FBR ✗ Failed"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 270,
        columnNumber: 35
    }, this);
    if (status === "queued") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        tone: "amber",
        children: "📡 FBR Queued"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 271,
        columnNumber: 35
    }, this);
    if (status === "not_required") return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        tone: "slate",
        children: "Not FBR-able"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 272,
        columnNumber: 41
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Badge, {
        tone: "amber",
        children: "📡 Not synced"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 273,
        columnNumber: 10
    }, this);
}
_c11 = FbrStatusBadge;
function FbrStamp({ fbr }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 flex items-center gap-4 rounded-xl border-2 border-emerald-600 bg-emerald-50 p-3",
        children: [
            fbr.qrDataUrl ? // eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: fbr.qrDataUrl,
                alt: "FBR QR",
                className: "h-24 w-24 shrink-0 rounded bg-white"
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 281,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid h-24 w-24 shrink-0 place-items-center rounded bg-white text-3xl",
                children: "📡"
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 283,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[12px] leading-relaxed",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-extrabold text-emerald-800",
                        children: "✓ FBR DIGITAL INVOICE — VERIFIED"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: "FBR Invoice No (IRN): "
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 287,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "font-mono",
                                children: fbr.fbrInvoiceNo
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 287,
                                columnNumber: 76
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: "USIN: "
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 288,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                className: "font-mono",
                                children: fbr.usin
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 288,
                                columnNumber: 60
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 288,
                        columnNumber: 9
                    }, this),
                    (fbr.ntn || fbr.strn) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: "Seller NTN: "
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 289,
                                columnNumber: 40
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: fbr.ntn ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 289,
                                columnNumber: 92
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: " · STRN: "
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 289,
                                columnNumber: 115
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: fbr.strn ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 289,
                                columnNumber: 164
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 289,
                        columnNumber: 35
                    }, this),
                    fbr.syncedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-slate-500",
                        children: [
                            "Reported to FBR: ",
                            new Date(fbr.syncedAt).toLocaleString()
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 290,
                        columnNumber: 26
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[11px] text-slate-500",
                        children: "Verify at FBR IRIS / Tax Asaan · SRO 709(I)/2025 · Rule 150Q"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 285,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 278,
        columnNumber: 5
    }, this);
}
_c12 = FbrStamp;
function useLetterhead() {
    _s3();
    const [letterhead, setLetterhead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLetterhead.useEffect": ()=>{
            fetch("/api/admin?entity=letterheads").then({
                "useLetterhead.useEffect": (r)=>r.json()
            }["useLetterhead.useEffect"]).then({
                "useLetterhead.useEffect": (data)=>{
                    const rows = data?.rows ?? [];
                    const def = rows.find({
                        "useLetterhead.useEffect": (r)=>r.isDefault
                    }["useLetterhead.useEffect"]) ?? rows[0] ?? null;
                    setLetterhead(def);
                }
            }["useLetterhead.useEffect"]).catch({
                "useLetterhead.useEffect": ()=>{}
            }["useLetterhead.useEffect"]);
        }
    }["useLetterhead.useEffect"], []);
    return letterhead;
}
_s3(useLetterhead, "gANhBjPS/QcRnel56K8ErWkuSw0=");
/** Standard Fallback Header & Footer content modeled around Pakistan tax configurations */ const FALLBACK_HEADER = "AL-NOOR SANITARY & TILES\nMain G.T. Road, Gujranwala | 055-1234567 | info@alnoorsanitory.pk\nNTN: 1234567-8 | STRN: 3277876123456";
const FALLBACK_FOOTER = "Thank you for your business! | Goods once sold will not be returned without receipt within 7 days.";
function LetterheadPrintWrapper({ children, title, layout = "A4", showFooter = false }) {
    _s4();
    const lh = useLetterhead();
    const headerLines = (lh?.headerText ?? FALLBACK_HEADER).split("\n");
    const footerText = lh?.footerText ?? FALLBACK_FOOTER;
    const HeaderImage = lh?.headerImage;
    const FooterImage = lh?.footerImage;
    if (layout === "Thermal") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[300px] border border-dashed p-4 bg-white text-slate-900 font-mono text-[10px] leading-tight",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center font-bold text-xs uppercase",
                    children: headerLines[0] || "AL-NOOR SANITARY & TILES"
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 354,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-[9px] text-slate-500 mt-1 whitespace-pre-line",
                    children: headerLines.slice(1).join("\n")
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "my-2 border-t border-dashed"
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 358,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center font-bold uppercase tracking-wider text-xs mb-2",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 359,
                    columnNumber: 9
                }, this),
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "my-2 border-t border-dashed"
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 361,
                    columnNumber: 9
                }, this),
                showFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center text-[9px] text-slate-500",
                    children: footerText
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 362,
                    columnNumber: 24
                }, this),
                showFooter && FooterImage && // eslint-disable-next-line @next/next/no-img-element
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: FooterImage,
                    alt: "",
                    className: "mx-auto mt-1 max-h-[40px] w-auto"
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 365,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/erp.tsx",
            lineNumber: 353,
            columnNumber: 7
        }, this);
    }
    const wrapperCls = layout === "A5" ? "mx-auto max-w-[580px] border p-6 bg-white text-slate-900 font-sans shadow-sm text-xs" : "mx-auto max-w-[800px] border p-8 bg-white text-slate-900 font-sans shadow-sm text-sm";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: wrapperCls,
        children: [
            HeaderImage && // eslint-disable-next-line @next/next/no-img-element
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: HeaderImage,
                alt: "letterhead",
                className: "mb-3 w-full rounded-lg object-contain"
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 379,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center border-b pb-4 mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-extrabold tracking-wide uppercase text-slate-900",
                        children: headerLines[0] || "AL-NOOR SANITARY & TILES"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 382,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-500 mt-1.5 whitespace-pre-line font-medium leading-relaxed",
                        children: headerLines.slice(1).join("\n")
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 381,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-4 text-center font-extrabold text-lg tracking-widest uppercase bg-slate-50 border-y py-2",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            children,
            showFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-12 pt-4 border-t text-center text-xs text-slate-500 italic",
                children: [
                    footerText,
                    FooterImage && // eslint-disable-next-line @next/next/no-img-element
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: FooterImage,
                        alt: "",
                        className: "mx-auto mt-3 max-h-[50px] w-auto object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 396,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 376,
        columnNumber: 5
    }, this);
}
_s4(LetterheadPrintWrapper, "rXghNcq0Is4eXJSLo64anW6aecI=", false, function() {
    return [
        useLetterhead
    ];
});
_c13 = LetterheadPrintWrapper;
function PrintDoc({ title, head, lines, totals, fbr, company, showFooter = false, pictures }) {
    _s5();
    const lh = useLetterhead();
    const headerLines = (lh?.headerText ?? FALLBACK_HEADER).split("\n");
    const footerText = lh?.footerText ?? FALLBACK_FOOTER;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "print-area rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-900",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center border-b pb-3 mb-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xl font-extrabold tracking-wide uppercase",
                        children: headerLines[0] || company?.name || "AL-NOOR SANITARY & TILES"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-500 mt-1 whitespace-pre-line font-medium leading-relaxed",
                        children: headerLines.slice(1).join("\n")
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 422,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-3 border-y py-2 text-center text-lg font-bold uppercase bg-slate-50",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 426,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-1 text-[13px]",
                children: head.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    k,
                                    ": "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 428,
                                columnNumber: 44
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 428,
                                columnNumber: 89
                            }, this)
                        ]
                    }, k, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 428,
                        columnNumber: 31
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                className: "mt-3 w-full text-[13px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-y border-slate-300 bg-slate-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-2 py-1.5 text-left",
                                    children: "#"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 70
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-2 py-1.5 text-left",
                                    children: "Description"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 114
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-2 py-1.5 text-right",
                                    children: "Qty"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 168
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-2 py-1.5 text-right",
                                    children: "Rate"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 215
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                    className: "px-2 py-1.5 text-right",
                                    children: "Amount"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 431,
                                    columnNumber: 263
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 431,
                            columnNumber: 16
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                        children: lines.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "border-b border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5",
                                        children: i + 1
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 434,
                                        columnNumber: 63
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5",
                                        children: l.desc
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 434,
                                        columnNumber: 103
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5 text-right",
                                        children: l.qty
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 434,
                                        columnNumber: 144
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5 text-right",
                                        children: money(l.rate)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 434,
                                        columnNumber: 195
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                        className: "px-2 py-1.5 text-right",
                                        children: money(l.amt)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 434,
                                        columnNumber: 254
                                    }, this)
                                ]
                            }, i, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 434,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 space-y-0.5 text-right text-[13px]",
                children: totals.map(([k, v])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: [
                                    k,
                                    ": "
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 439,
                                columnNumber: 46
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: v
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 439,
                                columnNumber: 91
                            }, this)
                        ]
                    }, k, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 439,
                        columnNumber: 33
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 438,
                columnNumber: 7
            }, this),
            fbr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FbrStamp, {
                fbr: fbr
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 441,
                columnNumber: 15
            }, this),
            pictures && pictures.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 border-t pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-500",
                        children: "Product Images"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 444,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: pictures.map((p, i)=>// eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: p,
                                alt: `img-${i + 1}`,
                                className: "h-24 w-24 rounded-lg border border-slate-200 object-cover"
                            }, i, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 448,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 443,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex justify-between text-xs text-slate-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Received by: ___________"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 454,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Approved by: ___________"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 454,
                        columnNumber: 46
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 453,
                columnNumber: 7
            }, this),
            showFooter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 border-t pt-2 text-center text-[11px] text-slate-400 italic",
                children: footerText
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 456,
                columnNumber: 22
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 419,
        columnNumber: 5
    }, this);
}
_s5(PrintDoc, "rXghNcq0Is4eXJSLo64anW6aecI=", false, function() {
    return [
        useLetterhead
    ];
});
_c14 = PrintDoc;
const FILE_ICON = (name)=>{
    const e = name.split(".").pop()?.toLowerCase() ?? "";
    if ([
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "bmp"
    ].includes(e)) return "🖼️";
    if (e === "pdf") return "📕";
    if ([
        "doc",
        "docx"
    ].includes(e)) return "📘";
    if ([
        "xls",
        "xlsx",
        "csv"
    ].includes(e)) return "📊";
    if ([
        "zip",
        "rar",
        "7z"
    ].includes(e)) return "🗜️";
    return "📄";
};
_c15 = FILE_ICON;
function MultiFileUploader({ value, onChange, label = "Attach Files", hint = "PDF, JPG, PNG, DOC, XLS, ZIP — select several at once" }) {
    _s6();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const list = value ? value.split(",").filter(Boolean) : [];
    async function handleFiles(e) {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        setUploading(true);
        try {
            const urls = [];
            for(let i = 0; i < files.length; i++){
                setProgress(`${i + 1}/${files.length}`);
                const fd = new FormData();
                fd.append("file", files[i]);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: fd
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Upload failed");
                urls.push(data.url);
            }
            onChange([
                ...list,
                ...urls
            ].join(","));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally{
            setUploading(false);
            setProgress("");
            e.target.value = "";
        }
    }
    const isImg = (u)=>/\.(jpe?g|png|gif|webp|bmp)$/i.test(u);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-slate-50/60 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-slate-600",
                        children: [
                            label,
                            list.length ? ` — ${list.length} file${list.length > 1 ? "s" : ""} attached` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 521,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700",
                        children: [
                            uploading ? `Uploading ${progress}…` : "📎 Attach Files",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                multiple: true,
                                className: "hidden",
                                onChange: handleFiles,
                                disabled: uploading
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 526,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 520,
                columnNumber: 7
            }, this),
            list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-dashed border-slate-300 py-4 text-center text-xs text-slate-400",
                children: hint
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 530,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3",
                children: list.map((url, idx)=>{
                    const name = decodeURIComponent(url.split("/").pop() ?? "file").replace(/^\d+_/, "");
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-28 rounded-lg border border-slate-200 bg-white p-1.5 text-center shadow-sm",
                        children: [
                            isImg(url) ? // eslint-disable-next-line @next/next/no-img-element
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: url,
                                target: "_blank",
                                rel: "noreferrer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: url,
                                    alt: name,
                                    className: "h-16 w-full rounded object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 539,
                                    columnNumber: 66
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 539,
                                columnNumber: 19
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: url,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "grid h-16 w-full place-items-center rounded bg-slate-100 text-2xl",
                                children: FILE_ICON(name)
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 541,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 truncate text-[10px] text-slate-600",
                                title: name,
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 543,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-0.5 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: url,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        className: "text-[10px] font-bold text-indigo-600 hover:underline",
                                        children: "open"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 545,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onChange(list.filter((_, i)=>i !== idx).join(",")),
                                        className: "text-[11px] font-bold text-rose-500",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 546,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 544,
                                columnNumber: 17
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 536,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 532,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 519,
        columnNumber: 5
    }, this);
}
_s6(MultiFileUploader, "lRd70Z8Hqt097nID3uYeooqH5QQ=");
_c16 = MultiFileUploader;
const DEPARTMENTS = [
    "Showroom",
    "Godown",
    "Project",
    "Wholesale",
    "Retail",
    "Installation",
    "Transport",
    "Head Office",
    "Marketing",
    "Other"
];
function AnalyticalDialog({ open, initial, onClose, onSave }) {
    _s7();
    const [rows, setRows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            department: "Showroom",
            percentage: 100
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalyticalDialog.useEffect": ()=>{
            if (open) setRows(initial.length ? initial.map({
                "AnalyticalDialog.useEffect": (r)=>({
                        ...r
                    })
            }["AnalyticalDialog.useEffect"]) : [
                {
                    department: "Showroom",
                    percentage: 100
                }
            ]);
        }
    }["AnalyticalDialog.useEffect"], [
        open,
        initial
    ]);
    if (!open) return null;
    const total = rows.reduce((a, r)=>a + (Number(r.percentage) || 0), 0);
    const balanced = Math.abs(total - 100) < 0.001;
    const valid = balanced && rows.length > 0 && rows.every((r)=>r.department && Number(r.percentage) > 0);
    function setRow(i, patch) {
        setRows((rs)=>rs.map((r, x)=>x === i ? {
                    ...r,
                    ...patch
                } : r));
    }
    function autoBalance() {
        if (!rows.length) return;
        setRows(rows.map((r, i)=>({
                ...r,
                percentage: i === 0 ? Math.round((100 - (total - (Number(rows[0].percentage) || 0))) * 100) / 100 : Number(r.percentage)
            })));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-lg rounded-2xl bg-white shadow-2xl",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-slate-200 px-5 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-bold text-slate-900",
                            children: "Analytical Cost Distribution"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 603,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "px-2 text-xl text-slate-400 hover:bg-slate-100 rounded-lg",
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 604,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 602,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-3 grid grid-cols-[1fr_100px_36px] gap-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Department / Cost Centre"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 608,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-right",
                                    children: "Percentage"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 608,
                                    columnNumber: 50
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 608,
                                    columnNumber: 96
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 607,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: rows.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-[1fr_100px_36px] items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: inputCls,
                                            value: r.department,
                                            onChange: (e)=>setRow(i, {
                                                    department: e.target.value
                                                }),
                                            children: [
                                                DEPARTMENTS.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: d,
                                                        children: d
                                                    }, d, false, {
                                                        fileName: "[project]/src/components/erp.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 43
                                                    }, this)),
                                                r.department && !DEPARTMENTS.includes(r.department) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: r.department,
                                                    children: r.department
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/erp.tsx",
                                                    lineNumber: 615,
                                                    columnNumber: 75
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/erp.tsx",
                                            lineNumber: 613,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            min: 0,
                                            max: 100,
                                            step: "0.01",
                                            className: `${inputCls} text-right`,
                                            value: r.percentage,
                                            onChange: (e)=>setRow(i, {
                                                    percentage: Number(e.target.value)
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/erp.tsx",
                                            lineNumber: 617,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "font-bold text-rose-500",
                                            onClick: ()=>setRows(rows.filter((_, x)=>x !== i)),
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/erp.tsx",
                                            lineNumber: 619,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 612,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 610,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 flex items-center justify-between rounded-xl border p-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-slate-600",
                                    children: "Total allocated"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 625,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `text-lg font-extrabold ${balanced ? "text-emerald-700" : "text-rose-600"}`,
                                    children: [
                                        total.toFixed(2),
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 626,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 624,
                            columnNumber: 11
                        }, this),
                        !balanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 rounded-xl bg-amber-50 p-2.5 text-xs font-semibold text-amber-800",
                            children: [
                                "Total must equal exactly ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                    children: "100%"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/erp.tsx",
                                    lineNumber: 630,
                                    columnNumber: 40
                                }, this),
                                ". It is currently ",
                                total.toFixed(2),
                                "% — you cannot save until it balances.",
                                total < 100 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: autoBalance,
                                            className: "underline",
                                            children: "put the remainder on the first line"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/erp.tsx",
                                            lineNumber: 631,
                                            columnNumber: 34
                                        }, this)
                                    ]
                                }, void 0, true)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 629,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setRows([
                                    ...rows,
                                    {
                                        department: "Other",
                                        percentage: 0
                                    }
                                ]),
                            className: "mt-3 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50",
                            children: "+ Add department"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 635,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 606,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-end gap-2 border-t border-slate-200 px-5 py-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                            tone: "ghost",
                            onClick: onClose,
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 639,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Btn, {
                            tone: "success",
                            disabled: !valid,
                            onClick: ()=>onSave(rows),
                            children: "✓ Apply 100%"
                        }, void 0, false, {
                            fileName: "[project]/src/components/erp.tsx",
                            lineNumber: 640,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 638,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/erp.tsx",
            lineNumber: 601,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 600,
        columnNumber: 5
    }, this);
}
_s7(AnalyticalDialog, "Da9j1J1AVoDE1ccsdisesFCaZQQ=");
_c17 = AnalyticalDialog;
function AnalyticalField({ value, onChange }) {
    _s8();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const splits = value ? value.split(",").map((p)=>{
        const [department, pct] = p.split(":");
        return {
            department: (department ?? "").trim(),
            percentage: Number((pct ?? "").replace("%", "").trim()) || 0
        };
    }).filter((r)=>r.department) : [];
    const total = splits.reduce((a, r)=>a + r.percentage, 0);
    const balanced = splits.length > 0 && Math.abs(total - 100) < 0.001;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                className: `${inputCls} flex items-center justify-between text-left ${balanced ? "" : "border-amber-300 bg-amber-50"}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `truncate text-xs ${splits.length ? "text-slate-800" : "text-slate-400"}`,
                        children: balanced ? splits.map((s)=>`${s.department} ${s.percentage}%`).join(", ") : "Set distribution…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 664,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `ml-2 shrink-0 rounded px-1.5 text-[10px] font-bold ${balanced ? "bg-emerald-100 text-emerald-700" : "bg-amber-200 text-amber-800"}`,
                        children: balanced ? "100%" : `${total || 0}%`
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 667,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 662,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnalyticalDialog, {
                open: open,
                initial: splits,
                onClose: ()=>setOpen(false),
                onSave: (rs)=>{
                    onChange(rs.map((r)=>`${r.department}: ${r.percentage}%`).join(", "));
                    setOpen(false);
                }
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 671,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s8(AnalyticalField, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c18 = AnalyticalField;
function MultiImageUploader({ value, onChange, label = "Pictures (multiple angles)" }) {
    _s9();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const list = value ? value.split(",").filter(Boolean) : [];
    async function handleFiles(e) {
        const files = Array.from(e.target.files ?? []);
        if (!files.length) return;
        setUploading(true);
        try {
            const urls = [];
            for (const f of files){
                const fd = new FormData();
                fd.append("file", f);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: fd
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Upload failed");
                urls.push(data.url);
            }
            onChange([
                ...list,
                ...urls
            ].join(","));
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally{
            setUploading(false);
            e.target.value = "";
        }
    }
    function move(idx, dir) {
        const next = [
            ...list
        ];
        const t = idx + dir;
        if (t < 0 || t >= next.length) return;
        [next[idx], next[t]] = [
            next[t],
            next[idx]
        ];
        onChange(next.join(","));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-slate-200 bg-slate-50/60 p-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs font-semibold text-slate-600",
                        children: [
                            label,
                            list.length ? ` — ${list.length} uploaded` : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 724,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "cursor-pointer rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700",
                        children: [
                            uploading ? "Uploading…" : "🖼️ Add Pictures",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                multiple: true,
                                className: "hidden",
                                onChange: handleFiles,
                                disabled: uploading
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 725,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 723,
                columnNumber: 7
            }, this),
            list.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "rounded-lg border border-dashed border-slate-300 py-4 text-center text-xs text-slate-400",
                children: "No pictures yet — the first image is used on the storefront"
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 731,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3",
                children: list.map((url, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: url,
                                alt: `pic-${idx + 1}`,
                                className: "h-20 w-20 rounded-lg border border-slate-200 object-cover"
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 739,
                                columnNumber: 15
                            }, this),
                            idx === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "absolute left-1 top-1 rounded bg-emerald-600 px-1 text-[9px] font-bold text-white",
                                children: "MAIN"
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 740,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex justify-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>move(idx, -1),
                                        className: "text-[10px] text-slate-500 hover:text-indigo-600",
                                        children: "◀"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 742,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onChange(list.filter((_, i)=>i !== idx).join(",")),
                                        className: "text-[10px] font-bold text-rose-500",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 743,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>move(idx, 1),
                                        className: "text-[10px] text-slate-500 hover:text-indigo-600",
                                        children: "▶"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/erp.tsx",
                                        lineNumber: 744,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 741,
                                columnNumber: 15
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 737,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 735,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 722,
        columnNumber: 5
    }, this);
}
_s9(MultiImageUploader, "7fSqO2OqLYyCuGUs/ZTqKghpSFk=");
_c19 = MultiImageUploader;
function useToast() {
    _s10();
    const [msg, setMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    return {
        msg,
        setMsg,
        toast: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Toast, {
            msg: msg,
            onDone: ()=>setMsg("")
        }, void 0, false, {
            fileName: "[project]/src/components/erp.tsx",
            lineNumber: 756,
            columnNumber: 32
        }, this)
    };
}
_s10(useToast, "wu2AL+BGTOpSyXjhnKep6uRDvi4=");
function LogoutButton() {
    _s11();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: async ()=>{
            await fetch("/api/auth", {
                method: "POST",
                body: JSON.stringify({
                    action: "logout"
                })
            });
            router.push("/login");
        },
        className: "rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800",
        children: "⏻ Logout"
    }, void 0, false, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 762,
        columnNumber: 5
    }, this);
}
_s11(LogoutButton, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c20 = LogoutButton;
function FileUploader({ value, onChange, label = "Attach Documents" }) {
    _s12();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filesList = value ? value.split(",").filter(Boolean) : [];
    async function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            file.name;
            fd.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: fd
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");
            const updated = [
                ...filesList,
                data.url
            ].join(",");
            onChange(updated);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally{
            setUploading(false);
        }
    }
    function removeFile(index) {
        const updated = filesList.filter((_, i)=>i !== index).join(",");
        onChange(updated);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border rounded-xl p-3 bg-slate-50/50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block text-xs font-medium text-slate-600 mb-2",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 810,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-2 transition inline-block",
                        children: [
                            uploading ? "Uploading…" : "📎 Upload File",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                className: "hidden",
                                onChange: handleFileChange,
                                disabled: uploading
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 814,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 812,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-slate-500",
                        children: "Supports PDF, JPG, PNG, DOCX, ZIP"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 816,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 811,
                columnNumber: 7
            }, this),
            filesList.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 space-y-1.5",
                children: filesList.map((url, idx)=>{
                    const parts = url.split("/");
                    const name = parts[parts.length - 1];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-3 text-xs bg-white p-2 rounded-lg border border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: url,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "text-indigo-600 hover:underline truncate font-medium max-w-[200px]",
                                children: [
                                    "📄 ",
                                    name.slice(13)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 825,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "text-rose-500 font-bold hover:text-rose-700 text-sm px-1.5",
                                onClick: ()=>removeFile(idx),
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 828,
                                columnNumber: 17
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 824,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 819,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 809,
        columnNumber: 5
    }, this);
}
_s12(FileUploader, "7fSqO2OqLYyCuGUs/ZTqKghpSFk=");
_c21 = FileUploader;
function PicUploader({ value, onChange, label = "Contact Picture" }) {
    _s13();
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function handleFileChange(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", {
                method: "POST",
                body: fd
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");
            onChange(data.url);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Upload failed");
        } finally{
            setUploading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border rounded-xl p-3 bg-slate-50/50 flex items-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-16 w-16 bg-slate-200 border rounded-full overflow-hidden shrink-0 flex items-center justify-center text-xl",
                children: value ? // eslint-disable-next-line @next/next/no-img-element
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: value,
                    alt: "Preview",
                    className: "h-full w-full object-cover"
                }, void 0, false, {
                    fileName: "[project]/src/components/erp.tsx",
                    lineNumber: 875,
                    columnNumber: 11
                }, this) : "👤"
            }, void 0, false, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 872,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-xs font-medium text-slate-600 mb-1",
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 881,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "cursor-pointer rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-1.5 transition inline-block",
                        children: [
                            uploading ? "Uploading…" : "📷 Upload Photo",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "file",
                                accept: "image/*",
                                className: "hidden",
                                onChange: handleFileChange,
                                disabled: uploading
                            }, void 0, false, {
                                fileName: "[project]/src/components/erp.tsx",
                                lineNumber: 884,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 882,
                        columnNumber: 9
                    }, this),
                    value && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "text-xs text-rose-500 hover:underline block mt-1",
                        onClick: ()=>onChange(""),
                        children: "Remove Photo"
                    }, void 0, false, {
                        fileName: "[project]/src/components/erp.tsx",
                        lineNumber: 887,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/erp.tsx",
                lineNumber: 880,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/erp.tsx",
        lineNumber: 871,
        columnNumber: 5
    }, this);
}
_s13(PicUploader, "7fSqO2OqLYyCuGUs/ZTqKghpSFk=");
_c22 = PicUploader;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19, _c20, _c21, _c22;
__turbopack_context__.k.register(_c, "PageHead");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "Stat");
__turbopack_context__.k.register(_c3, "Btn");
__turbopack_context__.k.register(_c4, "Field");
__turbopack_context__.k.register(_c5, "SearchInput");
__turbopack_context__.k.register(_c6, "SearchSelect");
__turbopack_context__.k.register(_c7, "Table");
__turbopack_context__.k.register(_c8, "Badge");
__turbopack_context__.k.register(_c9, "Modal");
__turbopack_context__.k.register(_c10, "Toast");
__turbopack_context__.k.register(_c11, "FbrStatusBadge");
__turbopack_context__.k.register(_c12, "FbrStamp");
__turbopack_context__.k.register(_c13, "LetterheadPrintWrapper");
__turbopack_context__.k.register(_c14, "PrintDoc");
__turbopack_context__.k.register(_c15, "FILE_ICON");
__turbopack_context__.k.register(_c16, "MultiFileUploader");
__turbopack_context__.k.register(_c17, "AnalyticalDialog");
__turbopack_context__.k.register(_c18, "AnalyticalField");
__turbopack_context__.k.register(_c19, "MultiImageUploader");
__turbopack_context__.k.register(_c20, "LogoutButton");
__turbopack_context__.k.register(_c21, "FileUploader");
__turbopack_context__.k.register(_c22, "PicUploader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/(erp)/layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ErpLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/erp.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const NAV = [
    {
        section: "Main",
        links: [
            {
                href: "/dashboard",
                icon: "📊",
                label: "Dashboard"
            },
            {
                href: "/pos",
                icon: "🛒",
                label: "POS Counter"
            }
        ]
    },
    {
        section: "Parties",
        links: [
            {
                href: "/customers",
                icon: "👥",
                label: "Customers"
            },
            {
                href: "/vendors",
                icon: "🏭",
                label: "Vendors"
            }
        ]
    },
    {
        section: "Inventory & Sales",
        links: [
            {
                href: "/inventory/items",
                icon: "📦",
                label: "Items"
            },
            {
                href: "/inventory/warehouses",
                icon: "🏬",
                label: "Warehouses"
            },
            {
                href: "/inventory/stock",
                icon: "📋",
                label: "Stock Ledger"
            },
            {
                href: "/inventory/quotations",
                icon: "📝",
                label: "Quotations"
            },
            {
                href: "/inventory/sales-orders",
                icon: "🧾",
                label: "Sales Orders"
            },
            {
                href: "/inventory/sales",
                icon: "🧮",
                label: "Sales Invoices"
            },
            {
                href: "/inventory/purchase-orders",
                icon: "📑",
                label: "Purchase Orders"
            },
            {
                href: "/inventory/purchases",
                icon: "📥",
                label: "Purchase Invoices"
            },
            {
                href: "/inventory/returns",
                icon: "↩️",
                label: "Returns"
            }
        ]
    },
    {
        section: "Accounts",
        links: [
            {
                href: "/accounts/chart",
                icon: "🗂️",
                label: "Chart of Accounts"
            },
            {
                href: "/accounts/vouchers",
                icon: "📒",
                label: "Vouchers"
            },
            {
                href: "/accounts/trial",
                icon: "⚖️",
                label: "Trial Balance"
            },
            {
                href: "/accounts/profit-loss",
                icon: "📈",
                label: "Profit & Loss"
            },
            {
                href: "/accounts/balance-sheet",
                icon: "🏦",
                label: "Balance Sheet"
            }
        ]
    },
    {
        section: "Reports",
        links: [
            {
                href: "/reports/sales",
                icon: "💰",
                label: "Sales Report"
            },
            {
                href: "/reports/purchases",
                icon: "🧾",
                label: "Purchase Report"
            },
            {
                href: "/reports/stock",
                icon: "📦",
                label: "Stock Report"
            },
            {
                href: "/reports/aging",
                icon: "⏳",
                label: "Customer Aging"
            },
            {
                href: "/reports/daily",
                icon: "🗓️",
                label: "Daily Sales"
            },
            {
                href: "/reports/commission",
                icon: "🤝",
                label: "Commission"
            },
            {
                href: "/reports/online",
                icon: "🛒",
                label: "Online Orders"
            },
            {
                href: "/reports/tax",
                icon: "🇵🇰",
                label: "Sales Tax & AIT"
            }
        ]
    },
    {
        section: "Compliance (PK)",
        links: [
            {
                href: "/settings/tax",
                icon: "🧮",
                label: "Tax Settings (PK)"
            },
            {
                href: "/settings/fbr",
                icon: "📡",
                label: "FBR Sync"
            },
            {
                href: "/settings/integrity",
                icon: "🩺",
                label: "Integrity Check"
            }
        ]
    },
    {
        section: "Settings",
        links: [
            {
                href: "/settings/users",
                icon: "👤",
                label: "Users"
            },
            {
                href: "/settings/permissions",
                icon: "🔑",
                label: "Permissions"
            },
            {
                href: "/settings/salesmen",
                icon: "🧑‍💼",
                label: "Salesmen"
            },
            {
                href: "/settings/letterheads",
                icon: "🧾",
                label: "Letterheads"
            },
            {
                href: "/settings/companies",
                icon: "🏢",
                label: "Companies"
            },
            {
                href: "/settings/currencies",
                icon: "💱",
                label: "Currencies"
            },
            {
                href: "/settings/data-upload",
                icon: "📤",
                label: "Data Upload"
            },
            {
                href: "/settings/backup",
                icon: "💾",
                label: "Backup"
            },
            {
                href: "/audit-log",
                icon: "🛡️",
                label: "Audit Log"
            }
        ]
    }
];
function ErpLayout({ children }) {
    _s();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mobileOpen, setMobileOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [collapsed, setCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canUp, setCanUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [canDown, setCanDown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const scrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ErpLayout.useEffect": ()=>{
            fetch("/api/auth").then({
                "ErpLayout.useEffect": (r)=>r.json()
            }["ErpLayout.useEffect"]).then({
                "ErpLayout.useEffect": (d)=>setUser(d.user ?? null)
            }["ErpLayout.useEffect"]).catch({
                "ErpLayout.useEffect": ()=>{}
            }["ErpLayout.useEffect"]);
            try {
                if (localStorage.getItem("erp_sidebar_collapsed") === "1") setCollapsed(true);
            } catch  {}
        }
    }["ErpLayout.useEffect"], []);
    function toggleCollapsed() {
        setCollapsed((c)=>{
            try {
                localStorage.setItem("erp_sidebar_collapsed", c ? "0" : "1");
            } catch  {}
            return !c;
        });
    }
    function updateArrows() {
        const el = scrollRef.current;
        if (!el) return;
        setCanUp(el.scrollTop > 8);
        setCanDown(el.scrollTop + el.clientHeight < el.scrollHeight - 8);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ErpLayout.useEffect": ()=>{
            updateArrows();
            window.addEventListener("resize", updateArrows);
            return ({
                "ErpLayout.useEffect": ()=>window.removeEventListener("resize", updateArrows)
            })["ErpLayout.useEffect"];
        }
    }["ErpLayout.useEffect"], [
        collapsed
    ]);
    function nudge(dir) {
        scrollRef.current?.scrollBy({
            top: dir * 220,
            behavior: "smooth"
        });
    }
    const widthCls = collapsed ? "lg:w-[72px]" : "lg:w-60";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-slate-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "no-print sticky top-0 z-40 flex items-center justify-between bg-slate-900 px-4 py-2.5 text-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setMobileOpen(!mobileOpen),
                                title: "Menu",
                                className: "rounded-lg px-2 py-1 text-xl hover:bg-slate-800 lg:hidden",
                                children: "☰"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCollapsed,
                                title: collapsed ? "Maximize sidebar" : "Minimize sidebar",
                                className: "erp-sidebar-toggle hidden rounded-lg px-2 py-1 text-lg hover:bg-slate-800 lg:block",
                                children: collapsed ? "➡️" : "⬅️"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/dashboard",
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-lg",
                                        children: "🏛️"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/layout.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold",
                                        children: "Sanitary ERP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/layout.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 118,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/layout.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "hidden rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 sm:block",
                                children: "🌐 Storefront"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden text-xs text-slate-400 md:block",
                                children: user ? `${user.fullName} (${user.role})` : "…"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LogoutButton"], {}, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/layout.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(erp)/layout.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    mobileOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-print fixed inset-0 z-30 bg-black/50 lg:hidden",
                        onClick: ()=>setMobileOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(erp)/layout.tsx",
                        lineNumber: 131,
                        columnNumber: 24
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: `erp-sidebar no-print fixed inset-y-0 left-0 z-30 flex w-60 shrink-0 flex-col bg-slate-900 pb-3 pt-16 text-slate-200 lg:sticky lg:top-[48px] lg:z-auto lg:h-[calc(100vh-48px)] lg:pt-0 ${widthCls} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: toggleCollapsed,
                                title: collapsed ? "Maximize sidebar (expand menu)" : "Minimize sidebar (icons only)",
                                className: "erp-sidebar-toggle absolute -right-3.5 top-16 z-10 hidden h-7 w-7 place-items-center rounded-full border border-slate-600 bg-slate-800 text-xs text-white shadow-lg hover:bg-indigo-600 lg:grid",
                                style: {
                                    transform: collapsed ? "rotate(180deg)" : "rotate(0deg)"
                                },
                                children: "◀"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: scrollRef,
                                onScroll: updateArrows,
                                className: `erp-sidebar-scroll max-h-full flex-1 overflow-y-auto px-3 py-3 lg:max-h-none ${collapsed ? "lg:px-2" : ""}`,
                                children: NAV.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `erp-sidebar-label px-2 pb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 ${collapsed ? "lg:hidden" : ""}`,
                                                children: g.section
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                                lineNumber: 150,
                                                columnNumber: 17
                                            }, this),
                                            collapsed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mx-2 mb-1 hidden border-t border-slate-800 lg:block"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                                lineNumber: 153,
                                                columnNumber: 31
                                            }, this),
                                            g.links.map((l)=>{
                                                const active = path === l.href;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: l.href,
                                                    title: l.label,
                                                    onClick: ()=>setMobileOpen(false),
                                                    className: `erp-nav-link group relative mb-0.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${collapsed ? "lg:justify-center lg:px-0" : ""} ${active ? "bg-indigo-600 text-white" : "hover:bg-slate-800"}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "shrink-0 text-base leading-none",
                                                            children: l.icon
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(erp)/layout.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `erp-sidebar-label ${collapsed ? "lg:hidden" : ""}`,
                                                            children: l.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(erp)/layout.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "pointer-events-none absolute left-full top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-950 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-xl group-hover:opacity-100 lg:group-hover:block ml-3",
                                                            style: {
                                                                display: collapsed ? undefined : "none"
                                                            },
                                                            children: [
                                                                l.icon,
                                                                " ",
                                                                l.label
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(erp)/layout.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, l.href, true, {
                                                    fileName: "[project]/src/app/(erp)/layout.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 21
                                                }, this);
                                            })
                                        ]
                                    }, g.section, true, {
                                        fileName: "[project]/src/app/(erp)/layout.tsx",
                                        lineNumber: 149,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `border-t border-slate-800 px-3 pt-2 ${collapsed ? "lg:px-2" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `flex items-center gap-1.5 ${collapsed ? "lg:flex-col" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>nudge(-1),
                                                disabled: !canUp,
                                                title: "Scroll menu up",
                                                className: "grid h-8 flex-1 place-items-center rounded-lg bg-slate-800 text-sm text-slate-200 hover:bg-slate-700 disabled:opacity-30 lg:flex-none lg:px-3",
                                                children: "▲"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                                lineNumber: 180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>nudge(1),
                                                disabled: !canDown,
                                                title: "Scroll menu down",
                                                className: "grid h-8 flex-1 place-items-center rounded-lg bg-slate-800 text-sm text-slate-200 hover:bg-slate-700 disabled:opacity-30 lg:flex-none lg:px-3",
                                                children: "▼"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                                lineNumber: 184,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: toggleCollapsed,
                                                title: collapsed ? "Maximize sidebar" : "Minimize sidebar",
                                                className: "erp-sidebar-toggle hidden h-8 flex-1 place-items-center rounded-lg bg-indigo-600 text-sm text-white hover:bg-indigo-500 lg:grid",
                                                children: collapsed ? "▶ Maximize" : "◀ Minimize"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                                lineNumber: 188,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/layout.tsx",
                                        lineNumber: 179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `erp-sidebar-label pt-1.5 text-center text-[10px] text-slate-500 ${collapsed ? "lg:hidden" : ""}`,
                                        children: "v1.1 · FBR Digital Invoicing ready"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/layout.tsx",
                                        lineNumber: 193,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/layout.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/layout.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "min-w-0 flex-1 p-4 md:p-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/(erp)/layout.tsx",
                        lineNumber: 199,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(erp)/layout.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(erp)/layout.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(ErpLayout, "J0qu0AipKPrOta/CIdJBwD/VmC0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ErpLayout;
var _c;
__turbopack_context__.k.register(_c, "ErpLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_02uo5lp._.js.map