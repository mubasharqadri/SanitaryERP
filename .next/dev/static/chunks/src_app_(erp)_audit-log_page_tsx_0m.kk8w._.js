(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(erp)/audit-log/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuditPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/erp.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuditPage() {
    _s();
    const { data, loading, reload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/admin?entity=audit");
    const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const rows = (data?.rows ?? []).filter((r)=>!q || ((r.username ?? "") + (r.action ?? "") + (r.tableName ?? "") + (r.recordId ?? "")).toLowerCase().includes(q.toLowerCase()));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHead"], {
                title: "🛡️ Audit Trail",
                sub: `${rows.length} recent actions`,
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchInput"], {
                            value: q,
                            onChange: setQ,
                            placeholder: "Search audit…"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                            lineNumber: 11,
                            columnNumber: 90
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                            tone: "ghost",
                            onClick: reload,
                            children: "↻"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                            lineNumber: 11,
                            columnNumber: 159
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-500",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                lineNumber: 12,
                columnNumber: 18
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                head: [
                    "#",
                    "Time",
                    "User",
                    "Action",
                    "Table",
                    "Record",
                    "Payload"
                ],
                children: rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: r.id
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 15,
                                columnNumber: 28
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 text-xs",
                                children: new Date(r.createdAt).toLocaleString()
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 16,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 font-medium",
                                children: r.username ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 17,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    tone: r.action === "delete" ? "red" : r.action === "create" ? "green" : "blue",
                                    children: r.action
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                    lineNumber: 18,
                                    columnNumber: 39
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 18,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 font-mono text-xs",
                                children: r.tableName ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 19,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 font-mono text-xs",
                                children: r.recordId ?? "—"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                className: "px-3 py-2 max-w-[280px] truncate text-xs text-slate-500",
                                children: JSON.stringify(r.payload)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                                lineNumber: 21,
                                columnNumber: 13
                            }, this)
                        ]
                    }, r.id, true, {
                        fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                        lineNumber: 15,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(erp)/audit-log/page.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_s(AuditPage, "sF96ywsAy1kkgPChh0A/m9M2RUQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"]
    ];
});
_c = AuditPage;
var _c;
__turbopack_context__.k.register(_c, "AuditPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28erp%29_audit-log_page_tsx_0m.kk8w._.js.map