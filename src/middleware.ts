import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = ["/login", "/signup", '/privacy', '/terms'];
    const isPublicPath = publicPaths.includes(path);
    const token = request.cookies.get("token")?.value || "";

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/problems", request.nextUrl));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/profile/:path*",
        "/problems/:path*",
        "/",
        "/login",
        "/signup"
    ],
    unstable_allowDynamic: [
        '/lib/utilities.js',
        '/node_modules/function-bind/**',
    ],
};