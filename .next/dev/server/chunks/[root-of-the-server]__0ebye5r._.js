module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/db/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}
const globalForDb = globalThis;
const pool = globalForDb.__arenaNextJsPostgresqlPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accounts",
    ()=>accounts,
    "auditLog",
    ()=>auditLog,
    "companies",
    ()=>companies,
    "currencies",
    ()=>currencies,
    "documentLines",
    ()=>documentLines,
    "documents",
    ()=>documents,
    "fbrLogs",
    ()=>fbrLogs,
    "fbrSettings",
    ()=>fbrSettings,
    "incentives",
    ()=>incentives,
    "items",
    ()=>items,
    "letterheads",
    ()=>letterheads,
    "parties",
    ()=>parties,
    "partySites",
    ()=>partySites,
    "permissions",
    ()=>permissions,
    "salesmen",
    ()=>salesmen,
    "sequences",
    ()=>sequences,
    "stockLedger",
    ()=>stockLedger,
    "taxSettings",
    ()=>taxSettings,
    "users",
    ()=>users,
    "voucherLines",
    ()=>voucherLines,
    "vouchers",
    ()=>vouchers,
    "warehouses",
    ()=>warehouses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/serial.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/varchar.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/boolean.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/numeric.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/date.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/indexes.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/unique-constraint.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/pg-core/checks.js [app-route] (ecmascript)");
;
;
const currencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("currencies", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("code", {
        length: 10
    }).notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 80
    }).notNull(),
    symbol: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("symbol", {
        length: 10
    }).notNull().default("Rs"),
    rateToBase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("rate_to_base", {
        precision: 18,
        scale: 6
    }).notNull().default("1"),
    isBase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_base").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("currencies_code_uidx").on(t.code),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("currencies_rate_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.rateToBase} >= 0`)
    ]);
const companies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("companies", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 160
    }).notNull(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("address"),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("email", {
        length: 120
    }),
    ntn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("ntn", {
        length: 40
    }),
    strn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("strn", {
        length: 40
    }),
    baseCurrencyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("base_currency_id").references(()=>currencies.id, {
        onDelete: "set null"
    }),
    isDefault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_default").notNull().default(false),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("companies_currency_idx").on(t.baseCurrencyId)
    ]);
const users = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("users", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("username", {
        length: 60
    }).notNull(),
    passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("password_hash").notNull(),
    fullName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("full_name", {
        length: 120
    }).notNull(),
    role: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("role", {
        length: 20
    }).notNull().default("user"),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    picture: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("picture"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("users_username_uidx").on(t.username),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("users_company_idx").on(t.companyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("users_role_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.role} in ('admin','manager','cashier','user')`)
    ]);
const permissions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("permissions", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("user_id").notNull().references(()=>users.id, {
        onDelete: "cascade"
    }),
    menuKey: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("menu_key", {
        length: 60
    }).notNull(),
    canView: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_view").notNull().default(false),
    canCreate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_create").notNull().default(false),
    canEdit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_edit").notNull().default(false),
    canDelete: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_delete").notNull().default(false),
    canPrint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_print").notNull().default(false),
    canExport: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_export").notNull().default(false),
    // Bulk data-transfer rights (CSV import / template download)
    canUpload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_upload").notNull().default(false),
    canDownload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("can_download").notNull().default(false)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("permissions_user_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unique"])("permissions_user_menu_uq").on(t.userId, t.menuKey)
    ]);
const salesmen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("salesmen", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 120
    }).notNull(),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }),
    area: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("area", {
        length: 120
    }),
    commissionRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("commission_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    // Multiple images per salesman: face photo, CNIC front, CNIC back, resume, etc.
    pictures: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("pictures"),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("salesmen_name_idx").on(t.name),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("salesmen_comm_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.commissionRate} >= 0`)
    ]);
const accounts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("accounts", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("code", {
        length: 30
    }).notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 160
    }).notNull(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("type", {
        length: 20
    }).notNull(),
    parentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("parent_id").references(()=>accounts.id, {
        onDelete: "set null"
    }),
    openingDebit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("opening_debit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    openingCredit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("opening_credit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    prevYearDebit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("prev_year_debit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    prevYearCredit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("prev_year_credit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    isSystem: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_system").notNull().default(false),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("accounts_code_uidx").on(t.code),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("accounts_type_idx").on(t.type),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("accounts_parent_idx").on(t.parentId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("accounts_type_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.type} in ('Asset','Liability','Equity','Income','Expense')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("accounts_od_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.openingDebit} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("accounts_oc_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.openingCredit} >= 0`)
    ]);
const warehouses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("warehouses", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("code", {
        length: 20
    }).notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 120
    }).notNull(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("address"),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("warehouses_company_idx").on(t.companyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("warehouses_code_idx").on(t.code)
    ]);
const parties = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("parties", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    type: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("type", {
        length: 20
    }).notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 160
    }).notNull(),
    cnic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("cnic", {
        length: 30
    }),
    ntn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("ntn", {
        length: 40
    }),
    strn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("strn", {
        length: 40
    }),
    phone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("phone", {
        length: 40
    }),
    mobile: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("mobile", {
        length: 40
    }),
    email: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("email", {
        length: 120
    }),
    area: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("area", {
        length: 120
    }),
    city: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("city", {
        length: 80
    }),
    province: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("province", {
        length: 40
    }),
    // PK tax profile — Income Tax Ordinance 2001 (filer / late filer / non-filer)
    filerStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("filer_status", {
        length: 20
    }).notNull().default("filer"),
    // Sales Tax Act 1990 — registered person holds a valid STRN
    salesTaxRegistered: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("sales_tax_registered").notNull().default(false),
    openingBalance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("opening_balance", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    creditLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("credit_limit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    salesmanId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("salesman_id").references(()=>salesmen.id, {
        onDelete: "set null"
    }),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    contactPic: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("contact_pic"),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_type_idx").on(t.type),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_name_idx").on(t.name),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_city_idx").on(t.city),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_salesman_idx").on(t.salesmanId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_company_idx").on(t.companyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("parties_filer_idx").on(t.filerStatus),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("parties_type_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.type} in ('customer','vendor')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("parties_credit_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.creditLimit} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("parties_filer_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.filerStatus} in ('filer','late_filer','non_filer')`)
    ]);
const partySites = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("party_sites", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    partyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("party_id").notNull().references(()=>parties.id, {
        onDelete: "cascade"
    }),
    siteName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("site_name", {
        length: 140
    }).notNull(),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("address"),
    contactPerson: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("contact_person", {
        length: 120
    }),
    contactNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("contact_number", {
        length: 40
    }),
    creditLimit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("credit_limit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    isClosed: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_closed").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("party_sites_party_idx").on(t.partyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("party_sites_credit_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.creditLimit} >= 0`)
    ]);
const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("items", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    code: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("code", {
        length: 40
    }).notNull(),
    barcode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("barcode", {
        length: 60
    }),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 200
    }).notNull(),
    category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("category", {
        length: 80
    }).notNull().default("General"),
    brand: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("brand", {
        length: 80
    }),
    model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("model", {
        length: 80
    }),
    unit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("unit", {
        length: 20
    }).notNull().default("PCS"),
    size: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("size", {
        length: 60
    }),
    color: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("color", {
        length: 60
    }),
    design: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("design", {
        length: 80
    }),
    origin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("origin", {
        length: 20
    }).notNull().default("Local"),
    featured: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("featured").notNull().default(false),
    costPrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("cost_price", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    salePrice: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sale_price", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    reorderLevel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("reorder_level", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    openingStock: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("opening_stock", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    // PK tax classification — Sales Tax Act 1990 schedules
    hsCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("hs_code", {
        length: 20
    }),
    taxClass: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("tax_class", {
        length: 20
    }).notNull().default("standard"),
    taxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("18"),
    warehouseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("warehouse_id").references(()=>warehouses.id, {
        onDelete: "set null"
    }),
    active: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("active").notNull().default(true),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    // Multiple product photos (comma-separated URLs) — several angles per item for the storefront
    pictures: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("pictures"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("items_code_uidx").on(t.code),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_barcode_idx").on(t.barcode),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_category_idx").on(t.category),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_brand_idx").on(t.brand),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_origin_idx").on(t.origin),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_featured_idx").on(t.featured),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_name_idx").on(t.name),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("items_hscode_idx").on(t.hsCode),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_origin_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.origin} in ('Local','Imported')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_cost_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.costPrice} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_sale_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.salePrice} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_reorder_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.reorderLevel} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_taxclass_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.taxClass} in ('standard','reduced','zero','exempt')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("items_taxrate_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.taxRate} >= 0 and ${t.taxRate} <= 100`)
    ]);
const sequences = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("sequences", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    prefix: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("prefix", {
        length: 20
    }).notNull(),
    period: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("period", {
        length: 10
    }).notNull(),
    lastNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("last_no").notNull().default(0)
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$unique$2d$constraint$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["unique"])("sequences_prefix_period_uq").on(t.prefix, t.period),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("sequences_prefix_idx").on(t.prefix)
    ]);
const documents = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("documents", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    docType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("doc_type", {
        length: 10
    }).notNull(),
    docNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("doc_no", {
        length: 40
    }).notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    partyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("party_id").references(()=>parties.id, {
        onDelete: "set null"
    }),
    warehouseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("warehouse_id").references(()=>warehouses.id, {
        onDelete: "set null"
    }),
    salesmanId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("salesman_id").references(()=>salesmen.id, {
        onDelete: "set null"
    }),
    currencyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("currency_id").references(()=>currencies.id, {
        onDelete: "set null"
    }),
    exchangeRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("exchange_rate", {
        precision: 18,
        scale: 6
    }).notNull().default("1"),
    subtotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("subtotal", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    discountPct: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("discount_pct", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    discountLumpsum: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("discount_lumpsum", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    salesTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sales_tax", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    salesTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sales_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("18"),
    // Further Tax u/s 3(1A), Sales Tax Act 1990 — supplies to unregistered persons
    furtherTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("further_tax", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("further_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    incomeTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("income_tax", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    // Advance Income Tax (withholding) u/s 153, Income Tax Ordinance 2001 — deducted from payable
    aitRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    aitAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_amount", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    aitSection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("ait_section", {
        length: 20
    }).notNull().default("none"),
    buyerFilerStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("buyer_filer_status", {
        length: 20
    }),
    transportCharges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("transport_charges", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    laborCharges: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("labor_charges", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    grandTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("grand_total", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    paidAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("paid_amount", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    paymentMode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("payment_mode", {
        length: 20
    }).notNull().default("credit"),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 20
    }).notNull().default("Posted"),
    validUntil: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("valid_until"),
    // FBR Digital Invoicing (SRO 709(I)/2025, Rule 150Q) sync state
    fbrStatus: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("fbr_status", {
        length: 20
    }).notNull().default("not_synced"),
    fbrInvoiceNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("fbr_invoice_no", {
        length: 60
    }),
    fbrUsin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("fbr_usin", {
        length: 60
    }),
    fbrSyncedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("fbr_synced_at"),
    fbrQr: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("fbr_qr"),
    convertedFromId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("converted_from_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    linkedInvoiceId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("linked_invoice_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("notes"),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    // Captured at invoice level when selling to an unregistered walk-in buyer
    walkinName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("walkin_name", {
        length: 160
    }),
    walkinContact: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("walkin_contact", {
        length: 120
    }),
    walkinPhone: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("walkin_phone", {
        length: 40
    }),
    walkinAddress: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("walkin_address"),
    walkinCity: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("walkin_city", {
        length: 80
    }),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("created_by").references(()=>users.id, {
        onDelete: "set null"
    }),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("documents_docno_uidx").on(t.docNo),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_doctype_idx").on(t.docType),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_date_idx").on(t.date),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_party_idx").on(t.partyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_status_idx").on(t.status),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_salesman_idx").on(t.salesmanId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_warehouse_idx").on(t.warehouseId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_fbrstatus_idx").on(t.fbrStatus),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("documents_fbrno_idx").on(t.fbrInvoiceNo),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_type_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.docType} in ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS','ADJ')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_grand_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.grandTotal} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_paid_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.paidAmount} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_aitsec_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.aitSection} in ('none','goods','services','contract')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_fbr_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.fbrStatus} in ('not_synced','queued','synced','failed','not_required')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("documents_filer_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.buyerFilerStatus} is null or ${t.buyerFilerStatus} in ('filer','late_filer','non_filer')`)
    ]);
const documentLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("document_lines", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    documentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("document_id").notNull().references(()=>documents.id, {
        onDelete: "cascade"
    }),
    itemId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("item_id").references(()=>items.id, {
        onDelete: "set null"
    }),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("description", {
        length: 220
    }),
    qty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("qty", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    unit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("unit", {
        length: 20
    }).notNull().default("PCS"),
    rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("rate", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    discountPct: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("discount_pct", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    discountAmt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("discount_amt", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("amount", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    returnCondition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("return_condition", {
        length: 20
    }).notNull().default("normal"),
    // Line-level tax (services vs goods can differ on the same invoice)
    itemType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("item_type", {
        length: 20
    }).notNull().default("goods"),
    salesTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sales_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("18"),
    salesTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sales_tax", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("further_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    furtherTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("further_tax", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    taxExempt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("tax_exempt").notNull().default(false),
    // Per-line Advance Income Tax withholding u/s 153
    aitSection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("ait_section", {
        length: 20
    }).notNull().default("goods"),
    aitRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("0"),
    aitAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_amount", {
        precision: 14,
        scale: 2
    }).notNull().default("0")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("document_lines_doc_idx").on(t.documentId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("document_lines_item_idx").on(t.itemId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_qty_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.qty} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_rate_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.rate} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_amt_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.amount} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_cond_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.returnCondition} in ('normal','damaged','broken')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_type_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.itemType} in ('goods','services')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("document_lines_aitsec_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.aitSection} in ('none','goods','services','contract')`)
    ]);
const vouchers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("vouchers", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    voucherType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("voucher_type", {
        length: 10
    }).notNull(),
    voucherNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("voucher_no", {
        length: 40
    }).notNull(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    narration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("narration"),
    partyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("party_id").references(()=>parties.id, {
        onDelete: "set null"
    }),
    documentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("document_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    currencyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("currency_id").references(()=>currencies.id, {
        onDelete: "set null"
    }),
    createdBy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("created_by").references(()=>users.id, {
        onDelete: "set null"
    }),
    totalDebit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("total_debit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    totalCredit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("total_credit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 20
    }).notNull().default("Posted"),
    documents: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("documents"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow(),
    deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("deleted_at")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uniqueIndex"])("vouchers_no_uidx").on(t.voucherNo),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("vouchers_type_idx").on(t.voucherType),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("vouchers_date_idx").on(t.date),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("vouchers_party_idx").on(t.partyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("vouchers_doc_idx").on(t.documentId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("vouchers_type_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.voucherType} in ('JV','BRV','BPV','CRV','CPV','ADJ','SINV','PINV','POS')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("vouchers_status_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.status} in ('Posted','Cancelled')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("vouchers_dr_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.totalDebit} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("vouchers_cr_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.totalCredit} >= 0`)
    ]);
const voucherLines = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("voucher_lines", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    voucherId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("voucher_id").notNull().references(()=>vouchers.id, {
        onDelete: "cascade"
    }),
    accountId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("account_id").references(()=>accounts.id, {
        onDelete: "restrict"
    }),
    debit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("debit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    credit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("credit", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    narration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("narration", {
        length: 220
    }),
    partyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("party_id").references(()=>parties.id, {
        onDelete: "set null"
    }),
    analyticalDistribution: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("analytical_distribution"),
    chequeNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("cheque_no", {
        length: 40
    }),
    chequeDate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("cheque_date")
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("voucher_lines_voucher_idx").on(t.voucherId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("voucher_lines_account_idx").on(t.accountId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("voucher_lines_party_idx").on(t.partyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("voucher_lines_dr_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.debit} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("voucher_lines_cr_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.credit} >= 0`)
    ]);
const stockLedger = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("stock_ledger", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    itemId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("item_id").references(()=>items.id, {
        onDelete: "restrict"
    }),
    warehouseId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("warehouse_id").references(()=>warehouses.id, {
        onDelete: "set null"
    }),
    qtyIn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("qty_in", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    qtyOut: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("qty_out", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("rate", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    docType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("doc_type", {
        length: 10
    }).notNull().default("ADJ"),
    documentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("document_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    narration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("narration", {
        length: 220
    }),
    // Return quality on that movement — condition is a LINE attribute, so it must live on the ledger row
    returnCondition: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("return_condition", {
        length: 20
    }).notNull().default("normal"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_item_idx").on(t.itemId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_date_idx").on(t.date),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_doctype_idx").on(t.docType),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_doc_idx").on(t.documentId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_wh_idx").on(t.warehouseId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("stock_ledger_cond_idx").on(t.returnCondition),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("stock_ledger_in_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.qtyIn} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("stock_ledger_out_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.qtyOut} >= 0`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("stock_ledger_cond_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.returnCondition} in ('normal','damaged','broken')`)
    ]);
const incentives = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("incentives", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$date$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["date"])("date").notNull(),
    kind: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("kind", {
        length: 20
    }).notNull(),
    partyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("party_id").references(()=>parties.id, {
        onDelete: "set null"
    }),
    documentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("document_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("amount", {
        precision: 14,
        scale: 2
    }).notNull().default("0"),
    narration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("narration"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("incentives_party_idx").on(t.partyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("incentives_date_idx").on(t.date),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("incentives_kind_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.kind} in ('given','received')`),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("incentives_amt_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.amount} >= 0`)
    ]);
const letterheads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("letterheads", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "cascade"
    }),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("name", {
        length: 120
    }).notNull(),
    headerText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("header_text"),
    footerText: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("footer_text"),
    // Branded artwork bands printed above the body and below the footer text
    headerImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("header_image"),
    footerImage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("footer_image"),
    isDefault: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_default").notNull().default(false),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("letterheads_company_idx").on(t.companyId)
    ]);
const taxSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("tax_settings", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    // Sales Tax Act 1990 — standard rate (s.3)
    salesTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("sales_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("18"),
    enableSalesTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("enable_sales_tax").notNull().default(true),
    // Further Tax u/s 3(1A) on supplies to unregistered persons
    furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("further_tax_rate", {
        precision: 8,
        scale: 3
    }).notNull().default("4"),
    enableFurtherTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("enable_further_tax").notNull().default(true),
    // AIT withholding u/s 153, Income Tax Ordinance 2001 — filer / late filer / non-filer
    aitGoodsFiler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_goods_filer", {
        precision: 8,
        scale: 3
    }).notNull().default("4.5"),
    aitGoodsLate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_goods_late", {
        precision: 8,
        scale: 3
    }).notNull().default("7"),
    aitGoodsNon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_goods_non", {
        precision: 8,
        scale: 3
    }).notNull().default("9"),
    aitServicesFiler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_services_filer", {
        precision: 8,
        scale: 3
    }).notNull().default("9"),
    aitServicesLate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_services_late", {
        precision: 8,
        scale: 3
    }).notNull().default("12"),
    aitServicesNon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_services_non", {
        precision: 8,
        scale: 3
    }).notNull().default("18"),
    aitContractFiler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_contract_filer", {
        precision: 8,
        scale: 3
    }).notNull().default("7.5"),
    aitContractLate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_contract_late", {
        precision: 8,
        scale: 3
    }).notNull().default("10"),
    aitContractNon: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$numeric$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numeric"])("ait_contract_non", {
        precision: 8,
        scale: 3
    }).notNull().default("15"),
    defaultAitSection: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("default_ait_section", {
        length: 20
    }).notNull().default("goods"),
    enableAit: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("enable_ait").notNull().default(true),
    // Strict mode blocks saving taxable invoices without valid seller STRN/NTN
    strictValidation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("strict_validation").notNull().default(false),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("tax_default_sec_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.defaultAitSection} in ('none','goods','services','contract')`)
    ]);
const fbrSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("fbr_settings", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    companyId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("company_id").references(()=>companies.id, {
        onDelete: "set null"
    }),
    businessName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("business_name", {
        length: 160
    }),
    ntn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("ntn", {
        length: 40
    }),
    strn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("strn", {
        length: 40
    }),
    province: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("province", {
        length: 40
    }).notNull().default("Punjab"),
    address: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("address"),
    environment: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("environment", {
        length: 20
    }).notNull().default("sandbox"),
    posId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("pos_id", {
        length: 40
    }).notNull().default("POS-01"),
    usinPrefix: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("usin_prefix", {
        length: 20
    }).notNull().default("USIN"),
    autoSync: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("auto_sync").notNull().default(false),
    // PRAL/IRIS API token (stored server-side; real token goes here in production)
    apiToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("api_token"),
    isActive: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$boolean$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["boolean"])("is_active").notNull().default(true),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("fbr_settings_company_idx").on(t.companyId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("fbr_env_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.environment} in ('sandbox','production')`)
    ]);
const fbrLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("fbr_logs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    documentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("document_id").references(()=>documents.id, {
        onDelete: "set null"
    }),
    usin: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("usin", {
        length: 60
    }),
    fbrInvoiceNo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("fbr_invoice_no", {
        length: 60
    }),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("status", {
        length: 20
    }).notNull().default("failed"),
    requestPayload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("request_payload"),
    responsePayload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("response_payload"),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("error"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("fbr_logs_doc_idx").on(t.documentId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("fbr_logs_status_idx").on(t.status),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$checks$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["check"])("fbr_logs_status_chk", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t.status} in ('synced','failed')`)
    ]);
const auditLog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("audit_log", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$serial$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serial"])("id").primaryKey(),
    userId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("user_id").references(()=>users.id, {
        onDelete: "set null"
    }),
    username: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("username", {
        length: 60
    }),
    action: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("action", {
        length: 30
    }).notNull(),
    tableName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("table_name", {
        length: 60
    }),
    recordId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$varchar$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["varchar"])("record_id", {
        length: 60
    }),
    payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("payload"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at").notNull().defaultNow()
}, (t)=>[
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("audit_log_user_idx").on(t.userId),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("audit_log_action_idx").on(t.action),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$indexes$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["index"])("audit_log_table_idx").on(t.tableName)
    ]);
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "MENU_KEYS",
    ()=>MENU_KEYS,
    "can",
    ()=>can,
    "clearSessionCookie",
    ()=>clearSessionCookie,
    "decodeSession",
    ()=>decodeSession,
    "encodeSession",
    ()=>encodeSession,
    "findUserByUsername",
    ()=>findUserByUsername,
    "getSessionUser",
    ()=>getSessionUser,
    "getUserPermissions",
    ()=>getUserPermissions,
    "hashPassword",
    ()=>hashPassword,
    "requireSessionUser",
    ()=>requireSessionUser,
    "sessionCookie",
    ()=>sessionCookie,
    "verifyPassword",
    ()=>verifyPassword
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const COOKIE = "erp_session";
const SECRET = process.env.SESSION_SECRET || "sanitary-erp-dev-secret-change-me";
function hashPassword(password) {
    const salt = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomBytes"])(16).toString("hex");
    const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, 64).toString("hex");
    return `${salt}:${hash}`;
}
function verifyPassword(password, stored) {
    try {
        const [salt, hash] = stored.split(":");
        if (!salt || !hash) return false;
        const derived = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["scryptSync"])(password, salt, 64).toString("hex");
        const a = Buffer.from(derived, "hex");
        const b = Buffer.from(hash, "hex");
        if (a.length !== b.length) return false;
        return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b);
    } catch  {
        return false;
    }
}
function sign(payload) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHmac"])("sha256", SECRET).update(payload).digest("hex");
}
function encodeSession(u) {
    const payload = Buffer.from(JSON.stringify(u)).toString("base64url");
    return `${payload}.${sign(payload)}`;
}
function decodeSession(token) {
    if (!token) return null;
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return null;
    try {
        const expected = sign(payload);
        const a = Buffer.from(sig, "utf8");
        const b = Buffer.from(expected, "utf8");
        if (a.length !== b.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["timingSafeEqual"])(a, b)) return null;
        return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    } catch  {
        return null;
    }
}
async function getSessionUser() {
    const jar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return decodeSession(jar.get(COOKIE)?.value);
}
async function requireSessionUser() {
    const u = await getSessionUser();
    if (!u) throw new Error("UNAUTHORIZED");
    return u;
}
function sessionCookie(token) {
    return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`;
}
function clearSessionCookie() {
    return `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
const MENU_KEYS = [
    "dashboard",
    "customers",
    "vendors",
    "items",
    "warehouses",
    "stock",
    "quotations",
    "sales_orders",
    "sales",
    "purchase_orders",
    "purchases",
    "returns",
    "pos",
    "chart",
    "vouchers",
    "trial",
    "pl",
    "balance_sheet",
    "reports_sales",
    "reports_purchases",
    "reports_stock",
    "data_upload",
    "aging",
    "daily",
    "reports_tax",
    "reports_online",
    "tax_settings",
    "fbr_sync",
    "salesmen",
    "users",
    "permissions",
    "letterheads",
    "companies",
    "currencies",
    "integrity",
    "backup",
    "audit_log"
];
async function getUserPermissions(userId) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"].userId, userId));
    const map = {};
    for (const r of rows){
        map[r.menuKey] = {
            view: r.canView,
            create: r.canCreate,
            edit: r.canEdit,
            del: r.canDelete,
            print: r.canPrint,
            exp: r.canExport
        };
    }
    return map;
}
async function can(user, menuKey, action = "view") {
    if (user.role === "admin") return true;
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"].userId, user.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"].menuKey, menuKey)));
    const p = rows[0];
    if (!p) return false;
    if (action === "view") return p.canView;
    if (action === "create") return p.canCreate;
    if (action === "edit") return p.canEdit;
    return p.canDelete;
}
async function findUserByUsername(username) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].username, username));
    return rows[0] ?? null;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/seed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ensureSeed",
    ()=>ensureSeed,
    "ensureTaxSeed",
    ()=>ensureTaxSeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
let seeded = null;
function ensureSeed() {
    if (!seeded) seeded = (async ()=>{
        await runSeed();
        await ensureTaxSeed();
    })().catch((e)=>{
        seeded = null;
        throw e;
    });
    return seeded;
}
async function ensureTaxSeed() {
    // drizzle-kit push does not diff CHECK constraints, so widen the doc-type
    // guard here on every boot (idempotent) to include Adjustment Invoices.
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`ALTER TABLE documents DROP CONSTRAINT IF EXISTS documents_type_chk`);
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].execute(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`ALTER TABLE documents ADD CONSTRAINT documents_type_chk
    CHECK (doc_type IN ('QUOT','SO','SINV','PO','PINV','SRET','PRET','POS','ADJ'))`);
    const t = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["taxSettings"]).limit(1);
    if (!t[0]) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["taxSettings"]).values({});
    const f = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).limit(1);
    const comps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["companies"]).limit(1);
    const c = comps[0];
    // Repair the pre-tax-era placeholder STRN (never a user-entered value)
    if (c && (c.strn === "STRN-001122" || !c.strn)) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["companies"]).set({
            strn: "3277876123456"
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["companies"].id, c.id));
    }
    if (!f[0]) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).values({
            companyId: c?.id ?? null,
            businessName: c?.name ?? "Business",
            ntn: c?.ntn ?? "1234567-8",
            strn: c?.strn && c.strn !== "STRN-001122" ? c.strn : "3277876123456",
            address: c?.address ?? null,
            province: "Punjab",
            environment: "sandbox",
            posId: "POS-01",
            usinPrefix: "USIN",
            autoSync: false,
            isActive: true
        });
    } else if (f[0].strn === "STRN-001122" || !f[0].strn) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).set({
            strn: "3277876123456"
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"].id, f[0].id));
    }
    for (const a of [
        {
            code: "1310",
            name: "AIT Deducted at Source (Receivable)",
            type: "Asset"
        },
        {
            code: "2110",
            name: "Further Tax Payable",
            type: "Liability"
        }
    ]){
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"].code, a.code)).limit(1);
        if (!rows[0]) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).values({
            code: a.code,
            name: a.name,
            type: a.type,
            isSystem: true
        });
    }
}
async function runSeed() {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].id
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].username, "admin")).limit(1);
    if (existing.length > 0) return;
    // Currencies
    const curRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["currencies"]).values([
        {
            code: "PKR",
            name: "Pakistani Rupee",
            symbol: "Rs",
            rateToBase: "1",
            isBase: true
        },
        {
            code: "USD",
            name: "US Dollar",
            symbol: "$",
            rateToBase: "278.5",
            isBase: false
        },
        {
            code: "CNY",
            name: "Chinese Yuan",
            symbol: "¥",
            rateToBase: "38.4",
            isBase: false
        }
    ]).returning();
    const pkr = curRows.find((c)=>c.code === "PKR");
    // Company
    const compRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["companies"]).values({
        name: "Al-Noor Sanitary & Tiles",
        address: "Main G.T. Road, Gujranwala, Pakistan",
        phone: "055-1234567",
        email: "info@alnoorsanitry.pk",
        ntn: "1234567-8",
        strn: "3277876123456",
        baseCurrencyId: pkr.id,
        isDefault: true
    }).returning();
    const company = compRows[0];
    // Chart of accounts
    const coa = [
        {
            code: "1001",
            name: "Cash in Hand",
            type: "Asset",
            openingDebit: "500000",
            isSystem: true
        },
        {
            code: "1002",
            name: "Bank - Meezan A/C",
            type: "Asset",
            openingDebit: "1500000",
            isSystem: true
        },
        {
            code: "1100",
            name: "Accounts Receivable",
            type: "Asset",
            isSystem: true
        },
        {
            code: "1200",
            name: "Inventory",
            type: "Asset",
            openingDebit: "2500000",
            isSystem: true
        },
        {
            code: "1300",
            name: "Advances & Prepayments",
            type: "Asset"
        },
        {
            code: "1310",
            name: "AIT Deducted at Source (Receivable)",
            type: "Asset",
            isSystem: true
        },
        {
            code: "2001",
            name: "Accounts Payable",
            type: "Liability",
            isSystem: true
        },
        {
            code: "2100",
            name: "Sales Tax Payable",
            type: "Liability",
            isSystem: true
        },
        {
            code: "2110",
            name: "Further Tax Payable",
            type: "Liability",
            isSystem: true
        },
        {
            code: "2200",
            name: "Withholding / Income Tax Payable",
            type: "Liability"
        },
        {
            code: "3001",
            name: "Owner Capital",
            type: "Equity",
            openingCredit: "4500000",
            isSystem: true
        },
        {
            code: "3002",
            name: "Retained Earnings",
            type: "Equity"
        },
        {
            code: "4000",
            name: "Sales Revenue",
            type: "Income",
            isSystem: true
        },
        {
            code: "4100",
            name: "Sales Discount Allowed",
            type: "Expense"
        },
        {
            code: "4200",
            name: "Incentive Income",
            type: "Income"
        },
        {
            code: "5000",
            name: "Purchases",
            type: "Expense",
            isSystem: true
        },
        {
            code: "5100",
            name: "Purchase Returns",
            type: "Income"
        },
        {
            code: "5200",
            name: "Transport Expense",
            type: "Expense"
        },
        {
            code: "5300",
            name: "Labor Expense",
            type: "Expense"
        },
        {
            code: "5400",
            name: "Salaries Expense",
            type: "Expense"
        },
        {
            code: "5500",
            name: "Commission Expense",
            type: "Expense"
        },
        {
            code: "5600",
            name: "General Expense",
            type: "Expense"
        }
    ];
    for (const a of coa){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).values({
            code: a.code,
            name: a.name,
            type: a.type,
            openingDebit: a.openingDebit ?? "0",
            openingCredit: a.openingCredit ?? "0",
            isSystem: a.isSystem ?? false
        });
    }
    // Warehouses
    const whRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["warehouses"]).values([
        {
            companyId: company.id,
            code: "WH-01",
            name: "Main Godown - Gujranwala",
            address: "G.T. Road Godown #4"
        },
        {
            companyId: company.id,
            code: "WH-02",
            name: "Showroom Stock",
            address: "Main Showroom Basement"
        }
    ]).returning();
    const mainWh = whRows[0];
    // Salesmen
    const smRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["salesmen"]).values([
        {
            name: "Rashid Mehmood",
            phone: "0301-1112233",
            area: "Gujranwala City",
            commissionRate: "2.5"
        },
        {
            name: "Imran Khan",
            phone: "0302-4455667",
            area: "Sialkot / Daska",
            commissionRate: "3"
        },
        {
            name: "Bilal Ahmed",
            phone: "0303-7788990",
            area: "Lahore",
            commissionRate: "2"
        }
    ]).returning();
    // Customers (with PK tax profiles)
    const custData = [
        {
            name: "Haji Traders",
            city: "Gujranwala",
            area: "Model Town",
            phone: "055-1111111",
            mobile: "0300-1111111",
            openingBalance: "125000",
            creditLimit: "500000",
            salesmanId: smRows[0].id,
            ntn: "2345678-1",
            strn: "3277876111001",
            cnic: "34101-1234567-8",
            filerStatus: "filer",
            salesTaxRegistered: true,
            province: "Punjab"
        },
        {
            name: "City Sanitary Store",
            city: "Sialkot",
            area: "Commissioner Road",
            phone: "052-2222222",
            mobile: "0300-2222222",
            openingBalance: "85000",
            creditLimit: "300000",
            salesmanId: smRows[1].id,
            ntn: "3456789-2",
            strn: "",
            cnic: "34202-7654321-9",
            filerStatus: "late_filer",
            salesTaxRegistered: false,
            province: "Punjab"
        },
        {
            name: "Modern Bath Gallery",
            city: "Lahore",
            area: "DHA Phase 2",
            phone: "042-3333333",
            mobile: "0300-3333333",
            openingBalance: "0",
            creditLimit: "1000000",
            salesmanId: smRows[2].id,
            ntn: "4567890-3",
            strn: "3277876111002",
            cnic: "35202-1111111-5",
            filerStatus: "filer",
            salesTaxRegistered: true,
            province: "Punjab"
        },
        {
            name: "Royal Builders",
            city: "Gujranwala",
            area: "Citi Housing",
            phone: "055-4444444",
            mobile: "0300-4444444",
            openingBalance: "250000",
            creditLimit: "2000000",
            salesmanId: smRows[0].id,
            ntn: "",
            strn: "",
            cnic: "34101-9999999-1",
            filerStatus: "non_filer",
            salesTaxRegistered: false,
            province: "Punjab"
        },
        {
            name: "Walk-in Customer",
            city: "Gujranwala",
            area: "Counter",
            phone: "-",
            mobile: "-",
            openingBalance: "0",
            creditLimit: "0",
            salesmanId: null,
            ntn: "",
            strn: "",
            cnic: "",
            filerStatus: "non_filer",
            salesTaxRegistered: false,
            province: "Punjab"
        },
        {
            name: "Online-Customer",
            city: "Web Orders",
            area: "Online Store",
            phone: "042-111-444-888",
            mobile: "0300-1112223",
            email: "orders@alnoorsanitory.pk",
            openingBalance: "0",
            creditLimit: "0",
            salesmanId: null,
            ntn: "",
            strn: "",
            cnic: "",
            filerStatus: "non_filer",
            salesTaxRegistered: false,
            province: "Punjab"
        }
    ];
    const custRows = [];
    for (const c of custData){
        const r = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"]).values({
            type: "customer",
            name: c.name,
            city: c.city,
            area: c.area,
            phone: c.phone,
            mobile: c.mobile,
            openingBalance: c.openingBalance,
            creditLimit: c.creditLimit,
            salesmanId: c.salesmanId,
            companyId: company.id,
            cnic: c.cnic || null,
            ntn: c.ntn || null,
            strn: c.strn || null,
            filerStatus: c.filerStatus,
            salesTaxRegistered: c.salesTaxRegistered,
            province: c.province
        }).returning();
        custRows.push(r[0]);
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["partySites"]).values([
        {
            partyId: custRows[3].id,
            siteName: "Citi Housing Site A",
            address: "Plot 44, Block C",
            contactPerson: "Ch. Aslam",
            contactNumber: "0300-9990001",
            creditLimit: "800000"
        },
        {
            partyId: custRows[3].id,
            siteName: "DHA Site B",
            address: "Plot 12, DHA",
            contactPerson: "Engr. Tariq",
            contactNumber: "0300-9990002",
            creditLimit: "600000"
        },
        {
            partyId: custRows[0].id,
            siteName: "Shop Godown",
            address: "Model Town Godown",
            contactPerson: "Haji Sahab",
            contactNumber: "0300-1111111",
            creditLimit: "200000"
        }
    ]);
    // Vendors
    const vendData = [
        {
            name: "Pak Ceramics (Pvt) Ltd",
            city: "Karachi",
            area: "SITE",
            phone: "021-5555555",
            openingBalance: "320000",
            creditLimit: "1500000",
            ntn: "5678901-4",
            filerStatus: "filer",
            salesTaxRegistered: true
        },
        {
            name: "China Import - Guangzhou Li",
            city: "Guangzhou",
            area: "Import",
            phone: "+86-200000000",
            openingBalance: "0",
            creditLimit: "5000000",
            ntn: "",
            filerStatus: "non_filer",
            salesTaxRegistered: false
        },
        {
            name: "Lahore Brass Works",
            city: "Lahore",
            area: "Badami Bagh",
            phone: "042-6666666",
            openingBalance: "95000",
            creditLimit: "800000",
            ntn: "6789012-5",
            filerStatus: "filer",
            salesTaxRegistered: true
        },
        {
            name: "Steelline Accessories",
            city: "Karachi",
            area: "Korangi",
            phone: "021-7777777",
            openingBalance: "45000",
            creditLimit: "400000",
            ntn: "7890123-6",
            filerStatus: "late_filer",
            salesTaxRegistered: false
        }
    ];
    for (const v of vendData){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"]).values({
            type: "vendor",
            name: v.name,
            city: v.city,
            area: v.area,
            phone: v.phone,
            openingBalance: v.openingBalance,
            creditLimit: v.creditLimit,
            companyId: company.id,
            ntn: v.ntn || null,
            filerStatus: v.filerStatus,
            salesTaxRegistered: v.salesTaxRegistered
        });
    }
    // 12-item catalog (with HS/PCT headings for FBR invoices)
    const catalog = [
        {
            code: "SAN-001",
            barcode: "100001",
            name: "Commode - One Piece Deluxe",
            category: "Sanitary Ware",
            brand: "PakCeram",
            model: "OP-200",
            unit: "PCS",
            size: '26"x14"',
            color: "White",
            design: "Modern",
            origin: "Local",
            featured: true,
            costPrice: "14500",
            salePrice: "18500",
            reorderLevel: "4",
            openingStock: "25",
            hsCode: "6910.1000"
        },
        {
            code: "SAN-002",
            barcode: "100002",
            name: "Wall Hung Basin with Pedestal",
            category: "Sanitary Ware",
            brand: "PakCeram",
            model: "WB-110",
            unit: "PCS",
            size: '22"x18"',
            color: "Ivory",
            design: "Classic",
            origin: "Local",
            featured: true,
            costPrice: "6800",
            salePrice: "9200",
            reorderLevel: "6",
            openingStock: "40",
            hsCode: "6910.1000"
        },
        {
            code: "SAN-003",
            barcode: "100003",
            name: "Imported Vanity Unit Double Drawer",
            category: "Sanitary Ware",
            brand: "EuroBath",
            model: "VN-900",
            unit: "SET",
            size: "36 inch",
            color: "Grey Oak",
            design: "Premium",
            origin: "Imported",
            featured: true,
            costPrice: "42000",
            salePrice: "58500",
            reorderLevel: "2",
            openingStock: "8",
            hsCode: "9403.6000"
        },
        {
            code: "TIL-001",
            barcode: "200001",
            name: "Floor Tile Glossy - Marble Look",
            category: "Tiles",
            brand: "Stile",
            model: "FT-24",
            unit: "MTR",
            size: '24"x24"',
            color: "Bianco White",
            design: "Marble",
            origin: "Local",
            featured: true,
            costPrice: "2150",
            salePrice: "2890",
            reorderLevel: "100",
            openingStock: "1200",
            hsCode: "6907.2100"
        },
        {
            code: "TIL-002",
            barcode: "200002",
            name: "Bathroom Wall Tile Matte",
            category: "Tiles",
            brand: "KaramCeram",
            model: "WT-12",
            unit: "MTR",
            size: '12"x24"',
            color: "Sage Green",
            design: "Stone",
            origin: "Local",
            featured: false,
            costPrice: "1780",
            salePrice: "2450",
            reorderLevel: "80",
            openingStock: "900",
            hsCode: "6907.2100"
        },
        {
            code: "TIL-003",
            barcode: "200003",
            name: "Imported Porcelain Slab - Calacatta",
            category: "Tiles",
            brand: "Rovese",
            model: "PS-120",
            unit: "MTR",
            size: '120x60cm',
            color: "Calacatta Gold",
            design: "Luxury",
            origin: "Imported",
            featured: true,
            costPrice: "6900",
            salePrice: "9400",
            reorderLevel: "30",
            openingStock: "150",
            hsCode: "6907.2100"
        },
        {
            code: "BRS-001",
            barcode: "300001",
            name: "Bib Cock Heavy Brass - Lever",
            category: "Brass Fittings",
            brand: "LahoreBrass",
            model: "BC-500",
            unit: "PCS",
            size: '1/2"',
            color: "Chrome",
            design: "Lever",
            origin: "Local",
            featured: false,
            costPrice: "1150",
            salePrice: "1650",
            reorderLevel: "20",
            openingStock: "300",
            hsCode: "8481.8000"
        },
        {
            code: "BRS-002",
            barcode: "300002",
            name: "Wall Mixer - Hot & Cold",
            category: "Brass Fittings",
            brand: "LahoreBrass",
            model: "WM-800",
            unit: "PCS",
            size: '3/4"',
            color: "Chrome",
            design: "Square",
            origin: "Local",
            featured: true,
            costPrice: "4800",
            salePrice: "6900",
            reorderLevel: "10",
            openingStock: "85",
            hsCode: "8481.8000"
        },
        {
            code: "BRS-003",
            barcode: "300003",
            name: "Imported Rain Shower Set - SS304",
            category: "Brass Fittings",
            brand: "EuroBath",
            model: "RS-10",
            unit: "SET",
            size: '10"',
            color: "Brushed Steel",
            design: "Rainfall",
            origin: "Imported",
            featured: true,
            costPrice: "16500",
            salePrice: "22800",
            reorderLevel: "3",
            openingStock: "12",
            hsCode: "8481.8000"
        },
        {
            code: "ACC-001",
            barcode: "400001",
            name: "PTMT Connection Pipe Pair",
            category: "Accessories",
            brand: "Steelline",
            model: "CP-24",
            unit: "PAIR",
            size: '24"',
            color: "Silver",
            design: "Braided",
            origin: "Local",
            featured: false,
            costPrice: "320",
            salePrice: "480",
            reorderLevel: "50",
            openingStock: "500",
            hsCode: "3917.3100"
        },
        {
            code: "ACC-002",
            barcode: "400002",
            name: "Waste Coupling + Bottle Trap Set",
            category: "Accessories",
            brand: "Steelline",
            model: "WT-01",
            unit: "SET",
            size: '1-1/4"',
            color: "Chrome",
            design: "Standard",
            origin: "Local",
            featured: false,
            costPrice: "890",
            salePrice: "1350",
            reorderLevel: "25",
            openingStock: "180",
            hsCode: "7324.9000"
        },
        {
            code: "ACC-003",
            barcode: "400003",
            name: "Imported Towel Rail + Shelf - Black",
            category: "Accessories",
            brand: "EuroBath",
            model: "TR-BLK",
            unit: "SET",
            size: '24"',
            color: "Matte Black",
            design: "Minimal",
            origin: "Imported",
            featured: false,
            costPrice: "3400",
            salePrice: "4950",
            reorderLevel: "5",
            openingStock: "3",
            hsCode: "7324.9000"
        }
    ];
    for (const it of catalog){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"]).values({
            ...it,
            warehouseId: mainWh.id
        });
    }
    // Users
    const adminRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).values({
        username: "admin",
        passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])("admin123"),
        fullName: "Administrator",
        role: "admin",
        companyId: company.id
    }).returning();
    const cashierRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"]).values({
        username: "cashier",
        passwordHash: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hashPassword"])("cash123"),
        fullName: "Counter Cashier",
        role: "cashier",
        companyId: company.id
    }).returning();
    // Cashier permissions: view dashboard, customers, items, sales, pos + create/edit on pos & sales
    const menuDefaults = {
        dashboard: {
            v: true,
            c: false,
            e: false
        },
        customers: {
            v: true,
            c: true,
            e: true
        },
        items: {
            v: true,
            c: false,
            e: false
        },
        sales: {
            v: true,
            c: true,
            e: false
        },
        pos: {
            v: true,
            c: true,
            e: true
        },
        stock: {
            v: true,
            c: false,
            e: false
        }
    };
    for (const [menuKey, p] of Object.entries(menuDefaults)){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["permissions"]).values({
            userId: cashierRows[0].id,
            menuKey,
            canView: p.v,
            canCreate: p.c,
            canEdit: p.e,
            canDelete: false,
            canPrint: true,
            canExport: false
        });
    }
    void adminRows;
    // Letterhead
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["letterheads"]).values({
        companyId: company.id,
        name: "Standard",
        headerText: "AL-NOOR SANITARY & TILES\nMain G.T. Road, Gujranwala | 055-1234567 | info@alnoorsanitory.pk\nNTN: 1234567-8 | STRN: 3277876123456",
        footerText: "Thank you for your business! | Goods once sold will not be returned without receipt within 7 days.",
        isDefault: true
    });
    // Tax + FBR defaults
    await ensureTaxSeed();
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CATEGORY_EMOJI",
    ()=>CATEGORY_EMOJI,
    "DOC_PREFIX",
    ()=>DOC_PREFIX,
    "VOUCHER_PREFIX",
    ()=>VOUCHER_PREFIX,
    "docNoFor",
    ()=>docNoFor,
    "fmtDate",
    ()=>fmtDate,
    "money",
    ()=>money,
    "num",
    ()=>num,
    "periodOf",
    ()=>periodOf,
    "stockBadge",
    ()=>stockBadge,
    "todayISO",
    ()=>todayISO
]);
function num(v) {
    if (v === null || v === undefined || v === "") return 0;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
}
function money(v) {
    return num(v).toLocaleString("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}
function fmtDate(d) {
    if (!d) return "-";
    try {
        const dt = new Date(String(d));
        if (Number.isNaN(dt.getTime())) return String(d).slice(0, 10);
        return dt.toISOString().slice(0, 10);
    } catch  {
        return String(d);
    }
}
function todayISO() {
    return new Date().toISOString().slice(0, 10);
}
function periodOf(dateStr) {
    return dateStr.slice(0, 7); // YYYY-MM
}
const DOC_PREFIX = {
    QUOT: "QT",
    SO: "SO",
    SINV: "INV",
    PO: "PO",
    PINV: "PINV",
    SRET: "SR",
    PRET: "PR",
    POS: "POS",
    ADJ: "ADJ"
};
const VOUCHER_PREFIX = {
    JV: "JV",
    BRV: "BRV",
    BPV: "BPV",
    CRV: "CRV",
    CPV: "CPV",
    ADJ: "ADJ",
    SINV: "SINV",
    PINV: "PINV",
    POS: "POSV"
};
function docNoFor(prefix, dateStr, n) {
    const [y, m] = dateStr.slice(0, 7).split("-");
    return `${prefix}-${y}-${m}-${String(n).padStart(4, "0")}`;
}
const CATEGORY_EMOJI = {
    "Sanitary Ware": "🚽",
    Tiles: "🧱",
    "Brass Fittings": "🔧",
    Accessories: "🧰",
    General: "📦"
};
function stockBadge(qty) {
    if (qty <= 0) return {
        label: "Out of Stock",
        cls: "bg-red-100 text-red-700 border-red-200"
    };
    if (qty <= 5) return {
        label: `Only ${qty} left`,
        cls: "bg-amber-100 text-amber-800 border-amber-200"
    };
    return {
        label: "In Stock",
        cls: "bg-emerald-100 text-emerald-700 border-emerald-200"
    };
}
}),
"[project]/src/lib/posting.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "accountIdByCode",
    ()=>accountIdByCode,
    "audit",
    ()=>audit,
    "computeLineTax",
    ()=>computeLineTax,
    "computeTotals",
    ()=>computeTotals,
    "deleteDocumentCascade",
    ()=>deleteDocumentCascade,
    "nextDocNo",
    ()=>nextDocNo,
    "nextVoucherNo",
    ()=>nextVoucherNo,
    "postFinancialVoucher",
    ()=>postFinancialVoucher,
    "postStock",
    ()=>postStock,
    "round2",
    ()=>round2,
    "stockOf",
    ()=>stockOf
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
/** Fallback when the sequence table drifts from real data (restore / manual edit):
 *  recover the highest existing number for this prefix+period so numbering never collides. */ async function recoverNextNo(table, prefix, period) {
    const col = table === "documents" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docNo : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].voucherNo;
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        no: col
    }).from(table === "documents" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${col} like ${prefix + "-" + period + "-%"}`);
    let max = 0;
    for (const r of rows){
        const tail = Number(String(r.no).split("-").pop());
        if (Number.isFinite(tail) && tail > max) max = tail;
    }
    return max + 1;
}
async function allocateNo(table, prefix, dateStr) {
    const period = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["periodOf"])(dateStr);
    const seqRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"].prefix, prefix), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"].period, period)));
    let candidate;
    if (!seqRows[0]) {
        candidate = await recoverNextNo(table, prefix, period);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"]).values({
            prefix,
            period,
            lastNo: candidate
        });
    } else {
        candidate = seqRows[0].lastNo + 1;
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"]).set({
            lastNo: candidate
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"].id, seqRows[0].id));
    }
    const no = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["docNoFor"])(prefix, dateStr, candidate);
    const col = table === "documents" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docNo : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].voucherNo;
    const clash = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        id: col
    }).from(table === "documents" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(col, no)).limit(1);
    if (clash[0]) {
        candidate = await recoverNextNo(table, prefix, period);
        if (seqRows[0]) await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"]).set({
            lastNo: candidate
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sequences"].id, seqRows[0].id));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["docNoFor"])(prefix, dateStr, candidate);
    }
    return no;
}
async function nextDocNo(docType, dateStr) {
    const prefix = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DOC_PREFIX"][docType] ?? docType;
    return allocateNo("documents", prefix, dateStr);
}
async function nextVoucherNo(vType, dateStr) {
    const prefix = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VOUCHER_PREFIX"][vType] ?? vType;
    return allocateNo("vouchers", prefix, dateStr);
}
async function accountIdByCode(code) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"].code, code)).limit(1);
    return rows[0]?.id ?? null;
}
function computeLineTax(l, opts) {
    const gross = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate);
    const dPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.discountPct);
    const discountAmt = round2(gross * dPct / 100);
    const taxable = round2(gross - discountAmt);
    const exempt = l.taxExempt === true;
    const stRate = exempt ? 0 : Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.salesTaxRate ?? opts.defaultRate));
    const salesTax = round2(taxable * stRate / 100);
    // Further tax u/s 3(1A) — supplies to unregistered persons, on the tax-inclusive value
    const applyFt = opts.chargeFurtherTax && !opts.buyerRegistered && !exempt && taxable > 0;
    const ftRate = applyFt ? Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.furtherTaxRate ?? opts.furtherRate)) : 0;
    const furtherTax = round2((taxable + salesTax) * ftRate / 100);
    // AIT u/s 153 withholding — resolved per line
    const rawSection = l.aitSection;
    const section = !opts.enableAit || rawSection === "none" ? "none" : rawSection && [
        "goods",
        "services",
        "contract"
    ].includes(rawSection) ? rawSection : [
        "goods",
        "services",
        "contract"
    ].includes(opts.defaultAitSection) ? opts.defaultAitSection : "none";
    const rawRate = l.aitRate;
    const filer = opts.buyerFiler;
    const resolved = section === "goods" ? filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitGoodsFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitGoodsLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitGoodsNon) : section === "services" ? filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitServicesFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitServicesLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitServicesNon) : filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitContractFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitContractLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitContractNon);
    const aitRate = section === "none" ? 0 : rawRate !== undefined && rawRate !== null && rawRate !== "" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(rawRate) : resolved;
    const aitAmount = round2(taxable * aitRate / 100);
    return {
        discountAmt,
        amount: taxable,
        itemType: l.itemType === "services" ? "services" : "goods",
        salesTaxRate: stRate,
        salesTax,
        furtherTaxRate: ftRate,
        furtherTax,
        taxExempt: exempt,
        aitSection: section,
        aitRate,
        aitAmount,
        lineTotal: round2(taxable + salesTax + furtherTax)
    };
}
function computeTotals(lines, opts) {
    const ctx = {
        defaultRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.defaultSalesTaxRate ?? 18),
        buyerRegistered: !!opts.buyerRegistered,
        chargeFurtherTax: opts.chargeFurtherTax !== false,
        furtherRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.furtherTaxRate ?? 4),
        enableAit: opts.enableAit !== false,
        defaultAitSection: opts.defaultAitSection ?? "goods",
        buyerFiler: opts.buyerFiler ?? "non_filer",
        aitGoodsFiler: opts.aitGoodsFiler ?? 0,
        aitGoodsLate: opts.aitGoodsLate ?? 0,
        aitGoodsNon: opts.aitGoodsNon ?? 0,
        aitServicesFiler: opts.aitServicesFiler ?? 0,
        aitServicesLate: opts.aitServicesLate ?? 0,
        aitServicesNon: opts.aitServicesNon ?? 0,
        aitContractFiler: opts.aitContractFiler ?? 0,
        aitContractLate: opts.aitContractLate ?? 0,
        aitContractNon: opts.aitContractNon ?? 0
    };
    let subtotal = 0, salesTax = 0, furtherTax = 0, aitAmount = 0;
    const computed = lines.map((l)=>{
        const t = computeLineTax(l, ctx);
        subtotal += t.amount;
        salesTax += t.salesTax;
        furtherTax += t.furtherTax;
        aitAmount += t.aitAmount;
        return {
            ...l,
            ...t
        };
    });
    const dPct = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.discountPct);
    const afterPct = subtotal - subtotal * dPct / 100;
    const grand = afterPct - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.discountLumpsum) + round2(salesTax) + round2(furtherTax) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.transport) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.labor);
    return {
        lines: computed,
        subtotal: round2(subtotal),
        salesTax: round2(salesTax),
        furtherTax: round2(furtherTax),
        aitAmount: round2(aitAmount),
        netPayable: round2(Math.max(0, round2(grand) - round2(aitAmount))),
        grandTotal: round2(Math.max(0, grand))
    };
}
function round2(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
}
async function audit(userId, username, action, tableName, recordId, payload) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auditLog"]).values({
            userId,
            username,
            action,
            tableName,
            recordId,
            payload: payload
        });
    } catch  {}
}
async function postStock(docId, docType, dateStr, warehouseId, lines, direction, narration) {
    if (direction === "none") return;
    for (const l of lines){
        if (!l.itemId) continue;
        // Damaged/broken sales returns ARE recorded at their real quantity so the ledger and the
        // damaged/broken report stay visible, but stockMap() excludes them from SALEABLE stock
        // (normal → back on the shelf, damaged → returnable to vendor, broken → written off as loss).
        const isLoss = docType === "SRET" && (l.returnCondition === "damaged" || l.returnCondition === "broken");
        const finalQtyIn = direction === "in" ? String(l.qty) : "0";
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).values({
            date: dateStr,
            itemId: l.itemId,
            warehouseId,
            qtyIn: finalQtyIn,
            qtyOut: direction === "out" ? String(l.qty) : "0",
            rate: String(l.rate),
            docType,
            documentId: docId,
            returnCondition: l.returnCondition ?? "normal",
            narration
        });
    }
}
async function postFinancialVoucher(opts) {
    const { docId, docType, docNo, date, partyId, grandTotal, createdBy, companyId, currencyId } = opts;
    const paid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.paidAmount);
    const st = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.salesTax);
    const ft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.furtherTax);
    const ait = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitAmount);
    const recvId = await accountIdByCode("1100");
    const payId = await accountIdByCode("2001");
    const salesId = await accountIdByCode("4000");
    const purchId = await accountIdByCode("5000");
    const cashId = await accountIdByCode("1001");
    const bankId = await accountIdByCode("1002");
    const taxId = await accountIdByCode("2100");
    const ftId = await accountIdByCode("2110") ?? taxId;
    const aitRecvId = await accountIdByCode("1310");
    const aitPayId = await accountIdByCode("2200");
    if (!recvId || !payId || !salesId || !purchId || !cashId || !bankId) return;
    const isSale = docType === "SINV" || docType === "POS";
    const isPurch = docType === "PINV";
    const isSRet = docType === "SRET";
    const isPRet = docType === "PRET";
    const isAdj = docType === "ADJ";
    if (!isSale && !isPurch && !isSRet && !isPRet && !isAdj) return;
    // Adjustment Invoice: stock quantity re-valued at cost → Dr Inventory / Cr Inventory Adjustment
    if (isAdj) {
        const invId = await accountIdByCode("1200");
        const adjId = await accountIdByCode("5600") ?? invId;
        if (!invId || !adjId || grandTotal <= 0) return;
        const aNo = await nextVoucherNo("JV", date);
        const av = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).values({
            voucherType: "JV",
            voucherNo: aNo,
            date,
            narration: `Inventory adjustment ${docNo}`,
            partyId,
            documentId: docId,
            companyId,
            currencyId,
            createdBy,
            totalDebit: String(grandTotal),
            totalCredit: String(grandTotal)
        }).returning();
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
            {
                voucherId: av[0].id,
                accountId: invId,
                debit: String(grandTotal),
                credit: "0",
                narration: `Stock adjusted in ${docNo}`,
                partyId
            },
            {
                voucherId: av[0].id,
                accountId: adjId,
                debit: "0",
                credit: String(grandTotal),
                narration: `Inventory adjustment ${docNo}`,
                partyId
            }
        ]);
        return;
    }
    const vType = isSale ? docType === "POS" ? "POS" : "SINV" : "PINV";
    const vNo = await nextVoucherNo(vType, date);
    const netSales = round2(grandTotal - st - ft);
    const vRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).values({
        voucherType: vType,
        voucherNo: vNo,
        date,
        narration: `Auto-post ${docType} ${docNo}`,
        partyId,
        documentId: docId,
        companyId,
        currencyId,
        createdBy,
        totalDebit: String(grandTotal),
        totalCredit: String(grandTotal)
    }).returning();
    const vId = vRows[0].id;
    const L = [];
    if (isSale) {
        L.push({
            accountId: recvId,
            debit: grandTotal,
            credit: 0,
            narration: `Receivable ${docNo}`
        });
        L.push({
            accountId: salesId,
            debit: 0,
            credit: netSales,
            narration: `Sales ${docNo}`
        });
        if (st > 0 && taxId) L.push({
            accountId: taxId,
            debit: 0,
            credit: st,
            narration: `Sales tax ${docNo}`
        });
        if (ft > 0 && ftId) L.push({
            accountId: ftId,
            debit: 0,
            credit: ft,
            narration: `Further tax u/s 3(1A) ${docNo}`
        });
    } else if (isPurch) {
        L.push({
            accountId: purchId,
            debit: netSales,
            credit: 0,
            narration: `Purchase ${docNo}`
        });
        if (st > 0 && taxId) L.push({
            accountId: taxId,
            debit: st,
            credit: 0,
            narration: `Input tax ${docNo}`
        });
        if (ft > 0 && ftId) L.push({
            accountId: ftId,
            debit: ft,
            credit: 0,
            narration: `Further tax input ${docNo}`
        });
        L.push({
            accountId: payId,
            debit: 0,
            credit: grandTotal,
            narration: `Payable ${docNo}`
        });
    } else if (isSRet) {
        L.push({
            accountId: salesId,
            debit: netSales,
            credit: 0,
            narration: `Sales return ${docNo}`
        });
        if (st > 0 && taxId) L.push({
            accountId: taxId,
            debit: st,
            credit: 0,
            narration: `Tax adj ${docNo}`
        });
        if (ft > 0 && ftId) L.push({
            accountId: ftId,
            debit: ft,
            credit: 0,
            narration: `Further tax adj ${docNo}`
        });
        L.push({
            accountId: recvId,
            debit: 0,
            credit: grandTotal,
            narration: `Receivable adj ${docNo}`
        });
    } else {
        L.push({
            accountId: payId,
            debit: grandTotal,
            credit: 0,
            narration: `Payable adj ${docNo}`
        });
        L.push({
            accountId: purchId,
            debit: 0,
            credit: netSales,
            narration: `Purchase return ${docNo}`
        });
        if (st > 0 && taxId) L.push({
            accountId: taxId,
            debit: 0,
            credit: st,
            narration: `Tax adj ${docNo}`
        });
        if (ft > 0 && ftId) L.push({
            accountId: ftId,
            debit: 0,
            credit: ft,
            narration: `Further tax adj ${docNo}`
        });
    }
    for (const l of L){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values({
            voucherId: vId,
            accountId: l.accountId,
            debit: String(l.debit),
            credit: String(l.credit),
            narration: l.narration,
            partyId
        });
    }
    // AIT withholding legs (s.153): sales → customer withholds from us (Dr 1310 / Cr 1100);
    // purchases → we withhold from vendor (Dr 2001 / Cr 2200). Returns reverse.
    if (ait > 0) {
        const wNo = await nextVoucherNo("JV", date);
        const wv = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).values({
            voucherType: "JV",
            voucherNo: wNo,
            date,
            narration: `AIT u/s 153 withholding on ${docNo}`,
            partyId,
            documentId: docId,
            companyId,
            currencyId,
            createdBy,
            totalDebit: String(ait),
            totalCredit: String(ait)
        }).returning();
        if (isSale && aitRecvId) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: wv[0].id,
                    accountId: aitRecvId,
                    debit: String(ait),
                    credit: "0",
                    narration: "AIT deducted by customer",
                    partyId
                },
                {
                    voucherId: wv[0].id,
                    accountId: recvId,
                    debit: "0",
                    credit: String(ait),
                    narration: "Receivable reduced (WHT)",
                    partyId
                }
            ]);
        } else if (isPurch && aitPayId) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: wv[0].id,
                    accountId: payId,
                    debit: String(ait),
                    credit: "0",
                    narration: "Payable reduced (WHT)",
                    partyId
                },
                {
                    voucherId: wv[0].id,
                    accountId: aitPayId,
                    debit: "0",
                    credit: String(ait),
                    narration: "WHT payable to FBR",
                    partyId
                }
            ]);
        } else if (isSRet && aitRecvId) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: wv[0].id,
                    accountId: recvId,
                    debit: String(ait),
                    credit: "0",
                    narration: "WHT reversal",
                    partyId
                },
                {
                    voucherId: wv[0].id,
                    accountId: aitRecvId,
                    debit: "0",
                    credit: String(ait),
                    narration: "AIT receivable reversal",
                    partyId
                }
            ]);
        } else if (isPRet && aitPayId) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: wv[0].id,
                    accountId: aitPayId,
                    debit: String(ait),
                    credit: "0",
                    narration: "WHT payable reversal",
                    partyId
                },
                {
                    voucherId: wv[0].id,
                    accountId: payId,
                    debit: "0",
                    credit: String(ait),
                    narration: "Payable reversal (WHT)",
                    partyId
                }
            ]);
        }
    }
    // Immediate payment leg (POS or advance paid on invoice)
    if (paid > 0 && (isSale || isPurch)) {
        const cashBank = opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? bankId : cashId;
        const pvType = isSale ? opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? "BRV" : "CRV" : opts.paymentMode === "bank" || opts.paymentMode === "card" || opts.paymentMode === "online" ? "BPV" : "CPV";
        const pvNo = await nextVoucherNo(pvType, date);
        const pv = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).values({
            voucherType: pvType,
            voucherNo: pvNo,
            date,
            narration: `Payment ${opts.paymentMode} against ${docNo}`,
            partyId,
            documentId: docId,
            companyId,
            currencyId,
            createdBy,
            totalDebit: String(paid),
            totalCredit: String(paid)
        }).returning();
        if (isSale) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: pv[0].id,
                    accountId: cashBank,
                    debit: String(paid),
                    credit: "0",
                    narration: "Cash/Bank received",
                    partyId
                },
                {
                    voucherId: pv[0].id,
                    accountId: recvId,
                    debit: "0",
                    credit: String(paid),
                    narration: "Receivable settled",
                    partyId
                }
            ]);
        } else {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).values([
                {
                    voucherId: pv[0].id,
                    accountId: payId,
                    debit: String(paid),
                    credit: "0",
                    narration: "Payable settled",
                    partyId
                },
                {
                    voucherId: pv[0].id,
                    accountId: cashBank,
                    debit: "0",
                    credit: String(paid),
                    narration: "Cash/Bank paid",
                    partyId
                }
            ]);
        }
    }
}
async function deleteDocumentCascade(docId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"].documentId, docId));
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].documentId, docId));
    const linked = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].documentId, docId));
    for (const v of linked){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"].voucherId, v.id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].id, v.id));
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"].documentId, docId));
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId));
}
async function stockOf(itemId) {
    const it = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"].id, itemId)).limit(1);
    const opening = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(it[0]?.openingStock);
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        in: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].qtyIn}),0)`,
        out: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`coalesce(sum(${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].qtyOut}),0)`
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].itemId, itemId));
    return opening + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(rows[0]?.in) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(rows[0]?.out);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/tax.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AIT_LABELS",
    ()=>AIT_LABELS,
    "FILER_LABELS",
    ()=>FILER_LABELS,
    "PK_FURTHER_TAX",
    ()=>PK_FURTHER_TAX,
    "PK_SALES_TAX_STANDARD",
    ()=>PK_SALES_TAX_STANDARD,
    "TAX_CLASS_LABELS",
    ()=>TAX_CLASS_LABELS,
    "aitRateFor",
    ()=>aitRateFor,
    "computeInvoiceTax",
    ()=>computeInvoiceTax,
    "ensureTaxAccounts",
    ()=>ensureTaxAccounts,
    "formatHint",
    ()=>formatHint,
    "getTaxSettings",
    ()=>getTaxSettings,
    "round2",
    ()=>round2,
    "validateCNIC",
    ()=>validateCNIC,
    "validateNTN",
    ()=>validateNTN,
    "validateSTRN",
    ()=>validateSTRN
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const PK_SALES_TAX_STANDARD = 18;
const PK_FURTHER_TAX = 4;
const FILER_LABELS = {
    filer: "Filer (ATL)",
    late_filer: "Late Filer",
    non_filer: "Non-Filer"
};
const AIT_LABELS = {
    none: "No withholding",
    goods: "u/s 153(1)(a) — Goods",
    services: "u/s 153(1)(b) — Services",
    contract: "u/s 153(1)(c) — Contract/Work"
};
const TAX_CLASS_LABELS = {
    standard: "Standard rated (18%)",
    reduced: "Reduced rate (8th Sch.)",
    zero: "Zero-rated (5th Sch.)",
    exempt: "Exempt (6th Sch.)"
};
function validateNTN(v) {
    if (!v) return false;
    return /^\d{7}-\d$/.test(v.trim());
}
function validateSTRN(v) {
    if (!v) return false;
    const digits = v.replace(/[^0-9]/g, "");
    return digits.length >= 10 && digits.length <= 15;
}
function validateCNIC(v) {
    if (!v) return false;
    return /^\d{5}-\d{7}-\d$/.test(v.trim());
}
function formatHint(kind) {
    if (kind === "ntn") return "Format: 1234567-8";
    if (kind === "strn") return "FBR numeric STRN, e.g. 3277876123456";
    return "Format: 34101-1234567-8";
}
async function getTaxSettings() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["taxSettings"]).limit(1);
    if (rows[0]) return rows[0];
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["taxSettings"]).values({}).returning();
    return created[0];
}
async function ensureTaxAccounts() {
    const need = [
        {
            code: "1310",
            name: "AIT Deducted at Source (Receivable)",
            type: "Asset"
        },
        {
            code: "2110",
            name: "Further Tax Payable",
            type: "Liability"
        }
    ];
    for (const a of need){
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"].code, a.code)).limit(1);
        if (!rows[0]) {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["accounts"]).values({
                code: a.code,
                name: a.name,
                type: a.type,
                isSystem: true
            });
        }
    }
}
function aitRateFor(s, section, filer) {
    if (section === "none") return 0;
    if (section === "goods") {
        return filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitGoodsFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitGoodsLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitGoodsNon);
    }
    if (section === "services") {
        return filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitServicesFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitServicesLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitServicesNon);
    }
    return filer === "filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitContractFiler) : filer === "late_filer" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitContractLate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(s.aitContractNon);
}
function round2(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
}
function computeInvoiceTax(opts) {
    const taxable = Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.taxableValue));
    const stRate = opts.taxExempt ? 0 : Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.salesTaxRate));
    const salesTax = round2(taxable * stRate / 100);
    const applyFurther = opts.chargeFurtherTax && !opts.buyerRegistered && !opts.taxExempt && taxable > 0;
    const ftRate = applyFurther ? Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.furtherTaxRate)) : 0;
    const furtherTax = round2((taxable + salesTax) * ftRate / 100);
    const grand = round2(taxable + salesTax + furtherTax + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.transport) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.labor));
    const aitRate = Math.max(0, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(opts.aitRate));
    const aitAmount = opts.aitSection === "none" ? 0 : round2(taxable * aitRate / 100);
    return {
        salesTax,
        furtherTax,
        grand,
        aitAmount,
        netPayable: round2(Math.max(0, grand - aitAmount))
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/lib/fbr.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "FBR_DOC_TYPES",
    ()=>FBR_DOC_TYPES,
    "buildFbrPayload",
    ()=>buildFbrPayload,
    "fbrQrText",
    ()=>fbrQrText,
    "getFbrSettings",
    ()=>getFbrSettings,
    "makeUsin",
    ()=>makeUsin,
    "submitToFbr",
    ()=>submitToFbr,
    "validateFbrPayload",
    ()=>validateFbrPayload
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/qrcode/lib/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tax.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const FBR_DOC_TYPES = [
    "SINV",
    "POS",
    "SRET"
];
async function getFbrSettings() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).limit(1);
    if (rows[0]) return rows[0];
    const comps = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["companies"]).limit(1);
    const c = comps[0];
    const created = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).values({
        companyId: c?.id ?? null,
        businessName: c?.name ?? "Business",
        ntn: c?.ntn ?? null,
        strn: c?.strn ?? null,
        address: c?.address ?? null
    }).returning();
    return created[0];
}
function makeUsin(prefix, docNo, docId) {
    const clean = docNo.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
    const hash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha1").update(`${docNo}:${docId}`).digest("hex").slice(0, 6).toUpperCase();
    return `${(prefix || "USIN").toUpperCase()}-${clean}-${hash}`;
}
function validateFbrPayload(p) {
    const errors = [];
    const warnings = [];
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateNTN"])(p.seller.ntn)) errors.push(`Seller NTN "${p.seller.ntn || "—"}" is invalid (FBR format 1234567-8). Fix in Settings → FBR.`);
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSTRN"])(p.seller.strn)) errors.push(`Seller STRN "${p.seller.strn || "—"}" is invalid (FBR numeric STRN, 10–15 digits). Fix in Settings → FBR.`);
    if (!p.seller.name) errors.push("Seller business name is required.");
    if (p.totals.taxableValue < 0) errors.push("Taxable value cannot be negative.");
    if (p.totals.salesTaxRate < 0 || p.totals.salesTaxRate > 100) errors.push("Sales tax rate must be 0–100.");
    const expectST = Math.round(p.totals.taxableValue * p.totals.salesTaxRate / 100 * 100) / 100;
    if (Math.abs(expectST - p.totals.salesTax) > 2) {
        errors.push(`Sales tax arithmetic mismatch: expected Rs ${expectST.toFixed(2)} at ${p.totals.salesTaxRate}% of Rs ${p.totals.taxableValue.toFixed(2)}, found Rs ${p.totals.salesTax.toFixed(2)}.`);
    }
    if (p.totals.furtherTax > 0 && p.buyer.registered) {
        warnings.push("Further Tax charged but buyer is marked sales-tax registered — FBR may reject (further tax is for unregistered buyers only).");
    }
    if (!p.buyer.registered && p.totals.furtherTax <= 0 && p.totals.taxableValue > 0 && p.totals.salesTaxRate > 0) {
        warnings.push("Buyer is unregistered and no Further Tax (4% u/s 3(1A)) charged — verify exemption.");
    }
    if (!p.items.length) errors.push("Invoice must contain at least one line item.");
    for (const it of p.items){
        if (!it.hsCode) warnings.push(`Line "${it.description}" has no HS Code — FBR requires PCT/HS headings on tax invoices.`);
        if (it.qty <= 0) errors.push(`Line "${it.description}" has invalid quantity.`);
    }
    if (p.withholding.amount > p.totals.grandTotal) errors.push("Withholding (AIT) amount cannot exceed the invoice total.");
    if (!p.buyer.ntn && !p.buyer.cnic && !p.buyer.strn) {
        warnings.push("Buyer has no NTN/CNIC/STRN on file — buyer input-tax claim will fail; capture CNIC/NTN for B2B sales.");
    }
    return {
        errors,
        warnings
    };
}
async function buildFbrPayload(docId) {
    const settings = await getFbrSettings();
    const dRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId)).limit(1);
    const doc = dRows[0];
    if (!doc) return {
        error: "Document not found."
    };
    if (!FBR_DOC_TYPES.includes(doc.docType)) {
        return {
            error: `Doc type ${doc.docType} is not FBR-reportable (only SINV, POS, SRET).`
        };
    }
    const lines = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"].documentId, docId));
    const pRows = doc.partyId ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"].id, doc.partyId)).limit(1) : [];
    const buyer = pRows[0] ?? null;
    // HS codes for lines
    const { items } = await __turbopack_context__.A("[project]/src/db/schema.ts [app-route] (ecmascript, async loader)");
    const itemsOut = [];
    for (const l of lines){
        let hs = "0000.0000";
        if (l.itemId) {
            const it = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(items).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(items.id, l.itemId)).limit(1);
            if (it[0]?.hsCode) hs = it[0].hsCode;
        }
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.amount);
        const taxAmount = Math.round(value * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.salesTaxRate) / 100 * 100) / 100;
        itemsOut.push({
            hsCode: hs,
            description: (l.description ?? "Item").slice(0, 120),
            qty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty),
            unit: l.unit ?? "PCS",
            rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate),
            value,
            taxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.salesTaxRate),
            taxAmount
        });
    }
    const payload = {
        usin: doc.fbrUsin || makeUsin(settings.usinPrefix, doc.docNo, doc.id),
        erpInvoiceNo: doc.docNo,
        invoiceType: doc.docType === "POS" ? "pos" : doc.docType === "SRET" ? "credit_note" : "sale",
        invoiceDate: String(doc.date).slice(0, 10),
        seller: {
            ntn: settings.ntn ?? "",
            strn: settings.strn ?? "",
            name: settings.businessName ?? "",
            province: settings.province ?? "Punjab",
            address: settings.address ?? ""
        },
        buyer: {
            name: buyer?.name ?? "Walk-in Customer",
            ntn: buyer?.ntn ?? null,
            strn: buyer?.strn ?? null,
            cnic: buyer?.cnic ?? null,
            filerStatus: doc.buyerFilerStatus ?? buyer?.filerStatus ?? "non_filer",
            registered: !!buyer?.salesTaxRegistered
        },
        items: itemsOut,
        totals: {
            taxableValue: roundTax((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.subtotal) - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.subtotal) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.discountPct) / 100 - (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.discountLumpsum) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.transportCharges) + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.laborCharges)),
            salesTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.salesTaxRate),
            salesTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.salesTax),
            furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.furtherTaxRate),
            furtherTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.furtherTax),
            grandTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.grandTotal)
        },
        withholding: {
            section: doc.aitSection ?? "none",
            rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.aitRate),
            amount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(doc.aitAmount)
        },
        posId: settings.posId ?? "POS-01",
        environment: settings.environment ?? "sandbox"
    };
    return {
        payload,
        settings
    };
}
function roundTax(n) {
    return Math.round((n + Number.EPSILON) * 100) / 100;
}
function fbrQrText(p, fbrInvoiceNo) {
    return [
        "FBR-DI",
        `IRN:${fbrInvoiceNo}`,
        `USIN:${p.usin}`,
        `NTN:${p.seller.ntn}`,
        `STRN:${p.seller.strn}`,
        `DT:${p.invoiceDate}`,
        `TXBL:${p.totals.taxableValue.toFixed(2)}`,
        `ST:${p.totals.salesTax.toFixed(2)}`,
        `FT:${p.totals.furtherTax.toFixed(2)}`,
        `TOTAL:${p.totals.grandTotal.toFixed(2)}`
    ].join("|");
}
async function submitToFbr(p, settings) {
    const { errors, warnings } = validateFbrPayload(p);
    if (errors.length) return {
        ok: false,
        errors,
        warnings
    };
    const live = settings.environment === "production" && !!settings.apiToken;
    void live; // live PRAL POST would go here with settings.apiToken (server-side only)
    // Sandbox issuance: deterministic IRN from USIN (idempotent re-sync safe)
    const digest = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])("sha256").update(`FBR|${p.seller.ntn}|${p.usin}`).digest("hex").slice(0, 10).toUpperCase();
    const fbrInvoiceNo = `FBR-${p.invoiceDate.replace(/-/g, "")}-${digest}`;
    const qrText = fbrQrText(p, fbrInvoiceNo);
    const qrDataUrl = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$qrcode$2f$lib$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].toDataURL(qrText, {
        width: 220,
        margin: 1
    });
    return {
        ok: true,
        fbrInvoiceNo,
        qrDataUrl,
        qrText,
        warnings
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/fbr/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "syncDocument",
    ()=>syncDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seed.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fbr.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tax.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/posting.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
async function syncDocument(docId, user) {
    const built = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildFbrPayload"])(docId);
    if ("error" in built) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).values({
            documentId: docId,
            status: "failed",
            error: built.error
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
            fbrStatus: "failed"
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId));
        return {
            ok: false,
            errors: [
                built.error
            ],
            warnings: []
        };
    }
    const { payload, settings } = built;
    const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["submitToFbr"])(payload, settings);
    if (!res.ok) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).values({
            documentId: docId,
            usin: payload.usin,
            status: "failed",
            requestPayload: payload,
            responsePayload: {
                errors: res.errors,
                warnings: res.warnings
            },
            error: res.errors.join(" | ")
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
            fbrStatus: "failed",
            fbrUsin: payload.usin
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "fbr-failed", "documents", String(docId), {
            errors: res.errors
        });
        return {
            ok: false,
            errors: res.errors,
            warnings: res.warnings
        };
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).values({
        documentId: docId,
        usin: payload.usin,
        fbrInvoiceNo: res.fbrInvoiceNo,
        status: "synced",
        requestPayload: payload,
        responsePayload: {
            fbrInvoiceNo: res.fbrInvoiceNo,
            qrText: res.qrText,
            warnings: res.warnings
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
        fbrStatus: "synced",
        fbrInvoiceNo: res.fbrInvoiceNo,
        fbrUsin: payload.usin,
        fbrSyncedAt: new Date(),
        fbrQr: res.qrDataUrl
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId));
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "fbr-synced", "documents", String(docId), {
        fbrInvoiceNo: res.fbrInvoiceNo,
        usin: payload.usin
    });
    return {
        ok: true,
        fbrInvoiceNo: res.fbrInvoiceNo,
        usin: payload.usin,
        qrDataUrl: res.qrDataUrl,
        warnings: res.warnings
    };
}
async function GET(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeed"])();
    const url = new URL(req.url);
    const docId = url.searchParams.get("documentId");
    if (docId) {
        const logs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"].documentId, Number(docId))).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"].id)).limit(20);
        const built = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildFbrPayload"])(Number(docId));
        const preview = "error" in built ? {
            error: built.error
        } : {
            payload: built.payload,
            validation: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateFbrPayload"])(built.payload)
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            logs,
            preview
        });
    }
    const settings = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFbrSettings"])();
    const fbrTypes = [
        ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FBR_DOC_TYPES"]
    ];
    const queue = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType} in (${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"].join(fbrTypes.map((t)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${t}`), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`,`)})`).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].date), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id)).limit(200);
    const logs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrLogs"].id)).limit(30);
    const stats = {
        total: queue.length,
        synced: queue.filter((d)=>d.fbrStatus === "synced").length,
        pending: queue.filter((d)=>d.fbrStatus === "not_synced" || d.fbrStatus === "queued").length,
        failed: queue.filter((d)=>d.fbrStatus === "failed").length,
        monthValue: queue.filter((d)=>String(d.date).slice(0, 7) === new Date().toISOString().slice(0, 7)).reduce((a, d)=>a + (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(d.grandTotal), 0)
    };
    const sellerChecks = {
        ntnValid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateNTN"])(settings.ntn),
        strnValid: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSTRN"])(settings.strn),
        hasName: !!(settings.businessName && settings.businessName.trim())
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        settings: {
            ...settings,
            apiToken: settings.apiToken ? "••••••" : ""
        },
        stats,
        queue,
        logs,
        sellerChecks,
        ready: sellerChecks.ntnValid && sellerChecks.strnValid && sellerChecks.hasName
    });
}
async function POST(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeed"])();
    const body = await req.json();
    const action = body.action;
    if (action === "save-settings") {
        if (user.role !== "admin") return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Admin only"
        }, {
            status: 403
        });
        const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFbrSettings"])();
        const d = body.data ?? {};
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"]).set({
            businessName: d.businessName ?? s.businessName,
            ntn: d.ntn ?? s.ntn,
            strn: d.strn ?? s.strn,
            province: d.province ?? s.province,
            address: d.address ?? s.address,
            environment: d.environment ?? s.environment,
            posId: d.posId ?? s.posId,
            usinPrefix: d.usinPrefix ?? s.usinPrefix,
            autoSync: d.autoSync ?? s.autoSync,
            isActive: d.isActive ?? s.isActive,
            ...d.apiToken && d.apiToken !== "••••••" ? {
                apiToken: d.apiToken
            } : {},
            updatedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fbrSettings"].id, s.id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "update", "fbr_settings", String(s.id), {
            ...d,
            apiToken: d.apiToken ? "***" : undefined
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
    if (action === "test") {
        const s = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFbrSettings"])();
        const errors = [];
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateNTN"])(s.ntn)) errors.push(`Seller NTN "${s.ntn || "—"}" invalid — FBR format is 1234567-8.`);
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSTRN"])(s.strn)) errors.push(`Seller STRN "${s.strn || "—"}" invalid — FBR numeric STRN (10–15 digits).`);
        if (!s.businessName) errors.push("Business name is required.");
        if (errors.length) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            errors
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            message: s.environment === "production" && s.apiToken ? `Production endpoint reachable (POS ${s.posId}). Live PRAL submission enabled.` : `Sandbox simulator reachable (POS ${s.posId}). Invoices will be validated + issued IRN/QR in sandbox mode.`
        });
    }
    if (action === "sync") {
        const res = await syncDocument(Number(body.documentId), user);
        if (!res.ok) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            errors: res.errors,
            warnings: res.warnings
        }, {
            status: 400
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            fbrInvoiceNo: res.fbrInvoiceNo,
            usin: res.usin,
            warnings: res.warnings
        });
    }
    if (action === "bulk") {
        const ids = Array.isArray(body.ids) ? body.ids.map(Number) : [];
        let list = ids;
        if (!list.length) {
            const pending = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
                id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id
            }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType} in ('SINV','POS','SRET') and ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].fbrStatus} in ('not_synced','failed','queued')`).limit(50);
            list = pending.map((p)=>p.id);
        }
        const results = [];
        for (const id of list.slice(0, 50)){
            try {
                const r = await syncDocument(id, user);
                results.push(r.ok ? {
                    id,
                    ok: true,
                    fbrInvoiceNo: r.fbrInvoiceNo
                } : {
                    id,
                    ok: false,
                    error: r.errors.join(" | ")
                });
            } catch (e) {
                results.push({
                    id,
                    ok: false,
                    error: e instanceof Error ? e.message : "Sync failed"
                });
            }
        }
        const okCount = results.filter((r)=>r.ok).length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            synced: okCount,
            failed: results.length - okCount,
            results
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unknown action"
    }, {
        status: 400
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/documents/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/drizzle-orm/sql/sql.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/seed.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/posting.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/tax.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fbr.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$fbr$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/api/fbr/route.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$fbr$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$fbr$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
const STOCK_DIR = {
    QUOT: "none",
    SO: "none",
    SINV: "out",
    POS: "out",
    PO: "none",
    PINV: "in",
    SRET: "in",
    PRET: "out",
    ADJ: "in"
};
const SALES_SIDE = [
    "QUOT",
    "SO",
    "SINV",
    "POS",
    "SRET"
];
const FBR_TYPES = [
    "SINV",
    "POS",
    "SRET"
];
async function GET(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeed"])();
    const url = new URL(req.url);
    const docType = url.searchParams.get("type") ?? "";
    const id = url.searchParams.get("id");
    const partyId = url.searchParams.get("partyId");
    if (id) {
        const d = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, Number(id)));
        if (!d[0]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Not found"
        }, {
            status: 404
        });
        const lines = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"].documentId, Number(id)));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            document: d[0],
            lines
        });
    }
    const conds = [];
    if (docType) {
        if (docType.includes(",")) conds.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["inArray"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType, docType.split(",")));
        else conds.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType, docType));
    }
    if (partyId) conds.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].partyId, Number(partyId)));
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where(conds.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["and"])(...conds) : undefined).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].date), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id)).limit(300);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        documents: rows
    });
}
async function POST(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const body = await req.json();
    // Convert action: QUOT->SINV, SO->SINV, PO->PINV
    if (body.action === "convert") {
        const srcId = Number(body.id);
        const target = String(body.target);
        const src = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, srcId));
        if (!src[0]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Source not found"
        }, {
            status: 404
        });
        const srcLines = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"].documentId, srcId));
        const date = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todayISO"])();
        const docNo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextDocNo"])(target, date);
        const dRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).values({
            docType: target,
            docNo,
            date,
            partyId: src[0].partyId,
            warehouseId: src[0].warehouseId,
            salesmanId: src[0].salesmanId,
            currencyId: src[0].currencyId,
            exchangeRate: src[0].exchangeRate,
            subtotal: src[0].subtotal,
            discountPct: src[0].discountPct,
            discountLumpsum: src[0].discountLumpsum,
            salesTax: src[0].salesTax,
            salesTaxRate: src[0].salesTaxRate,
            furtherTax: src[0].furtherTax,
            furtherTaxRate: src[0].furtherTaxRate,
            incomeTax: src[0].incomeTax,
            aitRate: src[0].aitRate,
            aitAmount: src[0].aitAmount,
            aitSection: src[0].aitSection,
            buyerFilerStatus: src[0].buyerFilerStatus,
            transportCharges: src[0].transportCharges,
            laborCharges: src[0].laborCharges,
            grandTotal: src[0].grandTotal,
            paidAmount: "0",
            paymentMode: "credit",
            status: target === "SO" || target === "PO" ? "Open" : "Posted",
            fbrStatus: "not_synced",
            convertedFromId: srcId,
            companyId: src[0].companyId,
            createdBy: user.id,
            notes: `Converted from ${src[0].docType} ${src[0].docNo}`
        }).returning();
        const newDoc = dRows[0];
        const plines = [];
        for (const l of srcLines){
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).values({
                documentId: newDoc.id,
                itemId: l.itemId,
                description: l.description,
                qty: l.qty,
                unit: l.unit,
                rate: l.rate,
                discountPct: l.discountPct,
                discountAmt: l.discountAmt,
                amount: l.amount,
                returnCondition: l.returnCondition ?? "normal"
            });
            plines.push({
                itemId: l.itemId,
                qty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty),
                rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate),
                returnCondition: l.returnCondition ?? "normal"
            });
        }
        const dir = STOCK_DIR[target] ?? "none";
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postStock"])(newDoc.id, target, date, newDoc.warehouseId, plines, dir, `${target} ${docNo}`);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postFinancialVoucher"])({
            docId: newDoc.id,
            docType: target,
            docNo,
            date,
            partyId: newDoc.partyId,
            grandTotal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(newDoc.grandTotal),
            paidAmount: 0,
            paymentMode: "credit",
            salesTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(newDoc.salesTax),
            furtherTax: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(newDoc.furtherTax),
            aitAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(newDoc.aitAmount),
            createdBy: user.id,
            companyId: newDoc.companyId,
            currencyId: newDoc.currencyId
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
            status: "Invoiced"
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, srcId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "create", "documents", String(newDoc.id), {
            convertedFrom: srcId,
            target
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            document: newDoc
        });
    }
    if (body.action === "status") {
        const sVal = String(body.status);
        const docId = Number(body.id);
        const docRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId)).limit(1);
        if (docRows[0] && sVal === "Cancelled") {
            if (docRows[0].fbrStatus === "synced") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: "Synced FBR invoices cannot be cancelled. Issue a Sales Return instead."
                }, {
                    status: 400
                });
            }
            // Cancel stocks & vouchers
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].documentId, docId));
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).set({
                status: "Cancelled",
                narration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`concat('CANCELLED - ', narration)`
            }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].documentId, docId));
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
            status: sVal
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, docId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "update-status", "documents", String(docId), {
            status: sVal
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
    // ---------- Create document (PK tax computed server-side) ----------
    const h = body.header ?? {};
    const docType = String(h.docType || body.docType);
    const date = String(h.date || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todayISO"])());
    const rawLines = body.lines ?? [];
    if (!rawLines.length) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Add at least one line item"
    }, {
        status: 400
    });
    const partyId = h.partyId ? Number(h.partyId) : null;
    const pRows = partyId ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"].id, partyId)).limit(1) : [];
    const party = pRows[0] ?? null;
    // Validate the return's linked invoice so users get a clear message, not a 500
    const linkedInvoiceId = h.linkedInvoiceId ? Number(h.linkedInvoiceId) : null;
    if (linkedInvoiceId) {
        const li = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id,
            docType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, linkedInvoiceId)).limit(1);
        if (!li[0]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Linked invoice #${linkedInvoiceId} does not exist. Clear the "Link to Invoice" field or pick a valid one.`
        }, {
            status: 400
        });
        const allowed = docType === "SRET" && [
            "SINV",
            "POS"
        ].includes(li[0].docType) || docType === "PRET" && li[0].docType === "PINV";
        if (!allowed) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `A ${docType} can only be linked to ${docType === "SRET" ? "a Sales Invoice (SINV/POS)" : "a Purchase Invoice (PINV)"}.`
        }, {
            status: 400
        });
    }
    const tax = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTaxSettings"])();
    const fbr = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFbrSettings"])();
    // ---- LINE-LEVEL PK tax: each line carries its own type & rates (goods vs services) ----
    const normLines = rawLines.map((l)=>({
            ...l,
            itemType: l.itemType === "services" ? "services" : "goods",
            taxExempt: l.taxExempt === true
        }));
    if (tax.strictValidation && SALES_SIDE.includes(docType) && normLines.some((l)=>!l.taxExempt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate) > 0)) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateNTN"])(fbr.ntn)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Strict tax mode: seller NTN is invalid. Fix it in Settings → FBR before posting taxable invoices."
        }, {
            status: 400
        });
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSTRN"])(fbr.strn)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Strict tax mode: seller STRN is invalid. Fix it in Settings → FBR before posting taxable invoices."
        }, {
            status: 400
        });
    }
    const globalRate = h.salesTaxRate !== undefined && h.salesTaxRate !== "" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(h.salesTaxRate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.salesTaxRate);
    const filer = h.buyerFilerStatus ?? party?.filerStatus ?? "non_filer";
    const first = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeTotals"])(normLines, {
        discountPct: h.discountPct,
        discountLumpsum: h.discountLumpsum,
        defaultSalesTaxRate: globalRate,
        buyerRegistered: !!party?.salesTaxRegistered,
        chargeFurtherTax: tax.enableFurtherTax && (h.chargeFurtherTax ?? true) && SALES_SIDE.includes(docType),
        furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.furtherTaxRate),
        enableAit: tax.enableAit,
        defaultAitSection: h.aitSection ?? tax.defaultAitSection ?? "goods",
        buyerFiler: filer,
        aitGoodsFiler: tax.aitGoodsFiler,
        aitGoodsLate: tax.aitGoodsLate,
        aitGoodsNon: tax.aitGoodsNon,
        aitServicesFiler: tax.aitServicesFiler,
        aitServicesLate: tax.aitServicesLate,
        aitServicesNon: tax.aitServicesNon,
        aitContractFiler: tax.aitContractFiler,
        aitContractLate: tax.aitContractLate,
        aitContractNon: tax.aitContractNon,
        transport: h.transportCharges,
        labor: h.laborCharges
    });
    const lines = first.lines;
    const salesTax = first.salesTax;
    const furtherTax = first.furtherTax;
    const grandTotal = first.grandTotal;
    const aitAmount = first.aitAmount;
    const netPayable = first.netPayable;
    const aitSection = lines.some((l)=>l.aitSection !== "none") ? lines.find((l)=>l.aitSection !== "none").aitSection : "none";
    const aitRate = first.subtotal ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["round2"])(aitAmount / first.subtotal * 100) : 0;
    const docNo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextDocNo"])(docType, date);
    const dRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).values({
        docType,
        docNo,
        date,
        partyId,
        warehouseId: h.warehouseId ? Number(h.warehouseId) : null,
        salesmanId: h.salesmanId ? Number(h.salesmanId) : null,
        currencyId: h.currencyId ? Number(h.currencyId) : null,
        exchangeRate: String(h.exchangeRate ?? 1),
        subtotal: String(first.subtotal),
        discountPct: String(h.discountPct ?? 0),
        discountLumpsum: String(h.discountLumpsum ?? 0),
        salesTax: String(salesTax),
        salesTaxRate: String(globalRate),
        furtherTax: String(furtherTax),
        furtherTaxRate: String(furtherTax > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.furtherTaxRate) : 0),
        incomeTax: String(aitAmount),
        aitRate: String(aitRate),
        aitAmount: String(aitAmount),
        aitSection,
        buyerFilerStatus: filer,
        transportCharges: String(h.transportCharges ?? 0),
        laborCharges: String(h.laborCharges ?? 0),
        grandTotal: String(grandTotal),
        paidAmount: String(h.paidAmount ?? 0),
        paymentMode: h.paymentMode || "credit",
        status: h.status || (docType === "SO" || docType === "PO" ? "Open" : "Posted"),
        fbrStatus: FBR_TYPES.includes(docType) ? "not_synced" : "not_required",
        validUntil: h.validUntil || null,
        notes: h.notes || null,
        documents: h.documents || null,
        linkedInvoiceId,
        walkinName: h.walkinName || null,
        walkinContact: h.walkinContact || null,
        walkinPhone: h.walkinPhone || null,
        walkinAddress: h.walkinAddress || null,
        walkinCity: h.walkinCity || null,
        companyId: h.companyId ? Number(h.companyId) : null,
        createdBy: user.id
    }).returning();
    const doc = dRows[0];
    for(let idx = 0; idx < lines.length; idx++){
        const l = lines[idx];
        const rawL = rawLines[idx];
        let desc = l.description || "";
        if (l.itemId) {
            const it = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"].id, Number(l.itemId))).limit(1);
            if (it[0] && !desc) desc = it[0].name;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).values({
            documentId: doc.id,
            itemId: l.itemId ? Number(l.itemId) : null,
            description: desc || null,
            qty: String(l.qty),
            unit: l.unit || "PCS",
            rate: String(l.rate),
            discountPct: String(l.discountPct ?? 0),
            discountAmt: String(l.discountAmt),
            amount: String(l.amount),
            returnCondition: rawL?.returnCondition || "normal",
            itemType: l.itemType,
            salesTaxRate: String(l.salesTaxRate),
            salesTax: String(l.salesTax),
            furtherTaxRate: String(l.furtherTaxRate),
            furtherTax: String(l.furtherTax),
            taxExempt: l.taxExempt,
            aitSection: l.aitSection,
            aitRate: String(l.aitRate),
            aitAmount: String(l.aitAmount)
        });
    }
    const dir = STOCK_DIR[docType] ?? "none";
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postStock"])(doc.id, docType, date, doc.warehouseId, lines.map((l, idx)=>({
            itemId: l.itemId ? Number(l.itemId) : null,
            qty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty),
            rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate),
            returnCondition: rawLines[idx]?.returnCondition || "normal"
        })), dir, `${docType} ${docNo}`);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postFinancialVoucher"])({
        docId: doc.id,
        docType,
        docNo,
        date,
        partyId: doc.partyId,
        grandTotal,
        paidAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(h.paidAmount),
        paymentMode: doc.paymentMode,
        salesTax,
        furtherTax,
        aitAmount,
        createdBy: user.id,
        companyId: doc.companyId,
        currencyId: doc.currencyId
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "create", "documents", String(doc.id), {
        docType,
        docNo,
        grandTotal,
        salesTax,
        furtherTax,
        ait: aitAmount
    });
    // Auto-sync to FBR
    let fbrResult = null;
    if (FBR_TYPES.includes(docType) && fbr.autoSync) {
        try {
            fbrResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$api$2f$fbr$2f$route$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncDocument"])(doc.id, user);
        } catch (e) {
            fbrResult = {
                ok: false,
                errors: [
                    e instanceof Error ? e.message : "FBR auto-sync failed"
                ]
            };
        }
        const refreshed = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, doc.id)).limit(1);
        if (refreshed[0]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            document: refreshed[0],
            netPayable,
            fbr: fbrResult
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        document: doc,
        netPayable,
        fbr: fbrResult
    });
}
async function PUT(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeed"])();
    const body = await req.json();
    const url = new URL(req.url);
    const id = Number(body.id ?? url.searchParams.get("id"));
    const docRows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, id)).limit(1);
    const oldDoc = docRows[0];
    if (!oldDoc) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Document not found"
    }, {
        status: 404
    });
    if (oldDoc.fbrStatus === "synced") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "FBR-synced invoice cannot be edited (fiscal record). Issue a Sales Return instead."
        }, {
            status: 400
        });
    }
    // Handle Cancel action via PUT
    if (body.action === "cancel") {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].documentId, id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).set({
            status: "Cancelled",
            narration: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`concat('CANCELLED - ', narration)`
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].documentId, id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
            status: "Cancelled"
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, id));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "cancel", "documents", String(id), {});
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    }
    // Normal Edit:
    const h = body.header ?? {};
    const docType = oldDoc.docType;
    const date = String(h.date || oldDoc.date || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["todayISO"])());
    const rawLines = body.lines ?? [];
    if (!rawLines.length) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Add at least one line item"
    }, {
        status: 400
    });
    const partyId = h.partyId ? Number(h.partyId) : null;
    const pRows = partyId ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parties"].id, partyId)).limit(1) : [];
    const party = pRows[0] ?? null;
    const linkedInvoiceId = h.linkedInvoiceId ? Number(h.linkedInvoiceId) : null;
    if (linkedInvoiceId) {
        const li = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
            id: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id,
            docType: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].docType
        }).from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, linkedInvoiceId)).limit(1);
        if (!li[0]) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `Linked invoice #${linkedInvoiceId} does not exist.`
        }, {
            status: 400
        });
    }
    const tax = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getTaxSettings"])();
    const fbr = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fbr$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFbrSettings"])();
    // ---- LINE-LEVEL PK tax (each line may be goods or services with its own rates) ----
    const normLines = rawLines.map((l)=>({
            ...l,
            itemType: l.itemType === "services" ? "services" : "goods",
            taxExempt: l.taxExempt === true
        }));
    if (tax.strictValidation && SALES_SIDE.includes(docType) && normLines.some((l)=>!l.taxExempt && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate) > 0)) {
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateNTN"])(fbr.ntn)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Strict tax mode: seller NTN is invalid."
        }, {
            status: 400
        });
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$tax$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateSTRN"])(fbr.strn)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Strict tax mode: seller STRN is invalid."
        }, {
            status: 400
        });
    }
    const globalRate = h.salesTaxRate !== undefined && h.salesTaxRate !== "" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(h.salesTaxRate) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.salesTaxRate);
    const filer = h.buyerFilerStatus ?? party?.filerStatus ?? "non_filer";
    const first = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeTotals"])(normLines, {
        discountPct: h.discountPct,
        discountLumpsum: h.discountLumpsum,
        defaultSalesTaxRate: globalRate,
        buyerRegistered: !!party?.salesTaxRegistered,
        chargeFurtherTax: tax.enableFurtherTax && (h.chargeFurtherTax ?? true) && SALES_SIDE.includes(docType),
        furtherTaxRate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.furtherTaxRate),
        enableAit: tax.enableAit,
        defaultAitSection: h.aitSection ?? tax.defaultAitSection ?? "goods",
        buyerFiler: filer,
        aitGoodsFiler: tax.aitGoodsFiler,
        aitGoodsLate: tax.aitGoodsLate,
        aitGoodsNon: tax.aitGoodsNon,
        aitServicesFiler: tax.aitServicesFiler,
        aitServicesLate: tax.aitServicesLate,
        aitServicesNon: tax.aitServicesNon,
        aitContractFiler: tax.aitContractFiler,
        aitContractLate: tax.aitContractLate,
        aitContractNon: tax.aitContractNon,
        transport: h.transportCharges,
        labor: h.laborCharges
    });
    const lines = first.lines;
    const salesTax = first.salesTax;
    const furtherTax = first.furtherTax;
    const grandTotal = first.grandTotal;
    const aitAmount = first.aitAmount;
    const aitSection = lines.some((l)=>l.aitSection !== "none") ? lines.find((l)=>l.aitSection !== "none").aitSection : "none";
    const aitRate = first.subtotal ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["round2"])(aitAmount / first.subtotal * 100) : 0;
    // Revert/Delete old lines, stock ledger & vouchers
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stockLedger"].documentId, id));
    const oldVchs = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].documentId, id));
    for (const v of oldVchs){
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["voucherLines"].voucherId, v.id));
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["vouchers"].id, v.id));
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"].documentId, id));
    // Update document
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).set({
        date,
        partyId,
        warehouseId: h.warehouseId ? Number(h.warehouseId) : null,
        salesmanId: h.salesmanId ? Number(h.salesmanId) : null,
        currencyId: h.currencyId ? Number(h.currencyId) : null,
        exchangeRate: String(h.exchangeRate ?? 1),
        subtotal: String(first.subtotal),
        discountPct: String(h.discountPct ?? 0),
        discountLumpsum: String(h.discountLumpsum ?? 0),
        salesTax: String(salesTax),
        salesTaxRate: String(globalRate),
        furtherTax: String(furtherTax),
        furtherTaxRate: String(furtherTax > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(tax.furtherTaxRate) : 0),
        incomeTax: String(aitAmount),
        aitRate: String(aitRate),
        aitAmount: String(aitAmount),
        aitSection,
        buyerFilerStatus: filer,
        transportCharges: String(h.transportCharges ?? 0),
        laborCharges: String(h.laborCharges ?? 0),
        grandTotal: String(grandTotal),
        paidAmount: String(h.paidAmount ?? 0),
        paymentMode: h.paymentMode || "credit",
        status: h.status || oldDoc.status,
        validUntil: h.validUntil || null,
        notes: h.notes || null,
        documents: h.documents || null,
        linkedInvoiceId,
        walkinName: h.walkinName !== undefined ? h.walkinName || null : oldDoc.walkinName,
        walkinContact: h.walkinContact !== undefined ? h.walkinContact || null : oldDoc.walkinContact,
        walkinPhone: h.walkinPhone !== undefined ? h.walkinPhone || null : oldDoc.walkinPhone,
        walkinAddress: h.walkinAddress !== undefined ? h.walkinAddress || null : oldDoc.walkinAddress,
        walkinCity: h.walkinCity !== undefined ? h.walkinCity || null : oldDoc.walkinCity,
        companyId: h.companyId ? Number(h.companyId) : null,
        updatedAt: new Date()
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, id));
    // Insert new lines
    for(let idx = 0; idx < lines.length; idx++){
        const l = lines[idx];
        const rawL = rawLines[idx];
        let desc = l.description || "";
        if (l.itemId) {
            const it = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["items"].id, Number(l.itemId))).limit(1);
            if (it[0] && !desc) desc = it[0].name;
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documentLines"]).values({
            documentId: id,
            itemId: l.itemId ? Number(l.itemId) : null,
            description: desc || null,
            qty: String(l.qty),
            unit: l.unit || "PCS",
            rate: String(l.rate),
            discountPct: String(l.discountPct ?? 0),
            discountAmt: String(l.discountAmt),
            amount: String(l.amount),
            returnCondition: rawL?.returnCondition || "normal",
            itemType: l.itemType,
            salesTaxRate: String(l.salesTaxRate),
            salesTax: String(l.salesTax),
            furtherTaxRate: String(l.furtherTaxRate),
            furtherTax: String(l.furtherTax),
            taxExempt: l.taxExempt,
            aitSection: l.aitSection,
            aitRate: String(l.aitRate),
            aitAmount: String(l.aitAmount)
        });
    }
    // Re-post stock ledger + financial vouchers
    const dir = STOCK_DIR[docType] ?? "none";
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postStock"])(id, docType, date, h.warehouseId ? Number(h.warehouseId) : null, lines.map((l, idx)=>({
            itemId: l.itemId ? Number(l.itemId) : null,
            qty: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.qty),
            rate: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(l.rate),
            returnCondition: rawLines[idx]?.returnCondition || "normal"
        })), dir, `${docType} ${oldDoc.docNo}`);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["postFinancialVoucher"])({
        docId: id,
        docType,
        docNo: oldDoc.docNo,
        date,
        partyId,
        grandTotal,
        paidAmount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["num"])(h.paidAmount),
        paymentMode: h.paymentMode || "credit",
        salesTax,
        furtherTax,
        aitAmount,
        createdBy: user.id,
        companyId: oldDoc.companyId,
        currencyId: oldDoc.currencyId
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "update", "documents", String(id), {
        docNo: oldDoc.docNo
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        grandTotal
    });
}
async function DELETE(req) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSessionUser"])();
    if (!user) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Unauthorized"
    }, {
        status: 401
    });
    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["documents"].id, id)).limit(1);
    if (rows[0]?.fbrStatus === "synced") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "FBR-synced invoice cannot be deleted (fiscal record). Issue a Sales Return (credit note) instead."
        }, {
            status: 400
        });
    }
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteDocumentCascade"])(id);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$posting$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["audit"])(user.id, user.username, "delete", "documents", String(id), {});
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ebye5r._.js.map