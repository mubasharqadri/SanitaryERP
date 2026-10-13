import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/dashboard", "/customers", "/vendors", "/inventory", "/pos", "/accounts", "/reports", "/settings", "/audit-log"];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const needsAuth = PROTECTED.some((p) => path === p || path.startsWith(p + "/"));
  if (!needsAuth) return NextResponse.next();
  const token = req.cookies.get("erp_session")?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/customers/:path*", "/vendors/:path*", "/inventory/:path*", "/pos/:path*", "/accounts/:path*", "/reports/:path*", "/settings/:path*", "/audit-log/:path*"],
};
