import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/token";

/** Set MAINTENANCE_MODE=on to show /coming-soon in place of every public page.
 * The admin keeps working; everyone, admins included, sees the maintenance page. */
const maintenance = process.env.MAINTENANCE_MODE === "on";

// Optimistic check only: pages and Server Actions re-verify with requireAdmin().
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (!isAdmin) {
    if (!maintenance || pathname === "/coming-soon") return NextResponse.next();
    return NextResponse.rewrite(new URL("/coming-soon", request.url));
  }

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  const isLogin = pathname === "/admin/login";

  if (!session && !isLogin) {
    const url = new URL("/admin/login", request.url);
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  if (session && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Everything except build assets, images and other static files.
  matcher: ["/((?!_next/static|_next/image|images/|favicon.ico|icon.png|.*\\.(?:png|jpe?g|svg|webp|ico|txt|xml)$).*)"],
};
