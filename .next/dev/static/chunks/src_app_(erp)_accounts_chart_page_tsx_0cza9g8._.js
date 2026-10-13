(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/(erp)/accounts/chart/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChartPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/erp.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ChartPage() {
    _s();
    const { data, loading, reload } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"])("/api/accounts");
    const [show, setShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [edit, setEdit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [viewAcc, setViewAcc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        code: "",
        name: "",
        type: "Asset",
        openingDebit: 0,
        openingCredit: 0,
        active: true
    });
    const { msg, setMsg, toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    async function save() {
        if (!form.code || !form.name) return setMsg("!Code and Name required");
        try {
            if (edit) await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/accounts", {
                method: "PUT",
                body: JSON.stringify({
                    id: edit.id,
                    ...form
                })
            });
            else await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/accounts", {
                method: "POST",
                body: JSON.stringify(form)
            });
            setShow(false);
            setEdit(null);
            reload();
            setMsg("Saved ✓");
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Save failed"));
        }
    }
    async function cancelAccount(a) {
        if (!confirm(`Are you sure you want to deactivate (cancel) account ${a.code}?`)) return;
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])("/api/accounts", {
                method: "PUT",
                body: JSON.stringify({
                    id: a.id,
                    code: a.code,
                    name: a.name,
                    type: a.type,
                    openingDebit: Number(a.openingDebit),
                    openingCredit: Number(a.openingCredit),
                    active: false
                })
            });
            reload();
            setMsg("Account deactivated ✓");
        } catch (e) {
            setMsg("!" + (e instanceof Error ? e.message : "Failed"));
        }
    }
    const groups = [
        "Asset",
        "Liability",
        "Equity",
        "Income",
        "Expense"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PageHead"], {
                title: "🗂️ Chart of Accounts",
                sub: "Double-entry ledger accounts with live balances",
                actions: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                    onClick: ()=>{
                        setEdit(null);
                        setForm({
                            code: "",
                            name: "",
                            type: "Asset",
                            openingDebit: 0,
                            openingCredit: 0,
                            active: true
                        });
                        setShow(true);
                    },
                    children: "+ New Account"
                }, void 0, false, {
                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                    lineNumber: 35,
                    columnNumber: 110
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-slate-500",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                lineNumber: 36,
                columnNumber: 18
            }, this) : groups.map((g)=>{
                const rows = (data?.accounts ?? []).filter((a)=>a.type === g);
                if (!rows.length) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "mb-2 font-bold text-slate-800",
                            children: [
                                g,
                                "s"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                            head: [
                                "Code",
                                "Name",
                                "Op. Dr",
                                "Op. Cr",
                                "Total Dr",
                                "Total Cr",
                                "Balance",
                                "Actions"
                            ],
                            children: rows.map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 font-mono text-xs font-bold",
                                            children: a.code
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 45,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2",
                                            children: [
                                                a.name,
                                                " ",
                                                !a.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    tone: "red",
                                                    children: "Inactive (Cancelled)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 46,
                                                    columnNumber: 68
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 46,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.openingDebit)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 47,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.openingCredit)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 48,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.totalDr)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 49,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.totalCr)
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 50,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right font-bold",
                                            children: [
                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(a.balance),
                                                " ",
                                                a.balance >= 0 ? "Dr" : "Cr"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-3 py-2 text-right whitespace-nowrap space-x-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs font-semibold text-indigo-600 hover:underline",
                                                    onClick: ()=>setViewAcc(a),
                                                    children: "View"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 53,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs font-semibold text-slate-600 hover:underline",
                                                    onClick: ()=>{
                                                        setEdit(a);
                                                        setForm({
                                                            code: a.code,
                                                            name: a.name,
                                                            type: a.type,
                                                            openingDebit: Number(a.openingDebit),
                                                            openingCredit: Number(a.openingCredit),
                                                            active: a.active
                                                        });
                                                        setShow(true);
                                                    },
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 21
                                                }, this),
                                                a.active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs font-semibold text-amber-600 hover:underline",
                                                    onClick: ()=>cancelAccount(a),
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 56,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "text-xs font-semibold text-rose-600 hover:underline",
                                                    onClick: async ()=>{
                                                        if (!confirm("Delete?")) return;
                                                        try {
                                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"])(`/api/accounts?id=${a.id}`, {
                                                                method: "DELETE"
                                                            });
                                                            reload();
                                                        } catch (e) {
                                                            setMsg("!" + (e instanceof Error ? e.message : "Delete failed"));
                                                        }
                                                    },
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 58,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 52,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, a.id, true, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this)
                    ]
                }, g, true, {
                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this);
            }),
            show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                title: edit ? "Edit Account" : "New Account",
                onClose: ()=>setShow(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-3 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                label: "Code *",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    value: form.code,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            code: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 69,
                                    columnNumber: 35
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 69,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                label: "Name *",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    value: form.name,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            name: e.target.value
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 35
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                label: "Type",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    value: form.type,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            type: e.target.value
                                        }),
                                    children: groups.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: g,
                                            children: g
                                        }, g, false, {
                                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 160
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 71,
                                    columnNumber: 33
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                label: "Opening Debit",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    value: form.openingDebit,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            openingDebit: Number(e.target.value)
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 42
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Field"], {
                                label: "Opening Credit",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "number",
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["inputCls"],
                                    value: form.openingCredit,
                                    onChange: (e)=>setForm({
                                            ...form,
                                            openingCredit: Number(e.target.value)
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 43
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-end gap-2 pb-2 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: form.active,
                                        onChange: (e)=>setForm({
                                                ...form,
                                                active: e.target.checked
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 74,
                                        columnNumber: 66
                                    }, this),
                                    " Active"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                        lineNumber: 68,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex justify-end gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                tone: "ghost",
                                onClick: ()=>setShow(false),
                                children: "Cancel"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 76,
                                columnNumber: 56
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                                onClick: save,
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 76,
                                columnNumber: 117
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            viewAcc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                title: `Account Profile — ${viewAcc.code}`,
                onClose: ()=>setViewAcc(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs uppercase font-semibold text-slate-500 tracking-wider",
                                        children: "Account name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl font-bold text-slate-900",
                                        children: [
                                            viewAcc.code,
                                            " — ",
                                            viewAcc.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 82,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 border-t pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Account Type"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: viewAcc.type
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 80
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    tone: viewAcc.active ? "green" : "red",
                                                    children: viewAcc.active ? "Active" : "Inactive"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 105
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 74
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 88,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 border-t pt-3 bg-slate-50 p-3 rounded-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Opening Debit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-slate-800",
                                                children: [
                                                    "Rs ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(viewAcc.openingDebit)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 91,
                                                columnNumber: 81
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Opening Credit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-slate-800",
                                                children: [
                                                    "Rs ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(viewAcc.openingCredit)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 92,
                                                columnNumber: 82
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 92,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-3 border-t pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Total Dr Postings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-slate-800",
                                                children: [
                                                    "Rs ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(viewAcc.totalDr)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 85
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-500",
                                                children: "Total Cr Postings"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 20
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-semibold text-slate-800",
                                                children: [
                                                    "Rs ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(viewAcc.totalCr)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 85
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t pt-3 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-500 uppercase tracking-wide",
                                        children: "Net Ledger Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-extrabold text-indigo-700 mt-1",
                                        children: [
                                            "Rs ",
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["money"])(viewAcc.balance),
                                            " ",
                                            viewAcc.balance >= 0 ? "Dr" : "Cr"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 flex justify-end",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Btn"], {
                            onClick: ()=>setViewAcc(null),
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                            lineNumber: 103,
                            columnNumber: 50
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this),
            toast
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(erp)/accounts/chart/page.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, this);
}
_s(ChartPage, "c6IKKDurV4AwBRRULB27+lX4u6c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApi"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$erp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"]
    ];
});
_c = ChartPage;
var _c;
__turbopack_context__.k.register(_c, "ChartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_%28erp%29_accounts_chart_page_tsx_0cza9g8._.js.map