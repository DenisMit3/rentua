import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

    // Protect Admin Routes
    if (isOnAdmin) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", req.nextUrl));
        }

        // Role check logic
        const userRole = (req.auth?.user as any)?.role;
        if (userRole !== "ADMIN") {
            // Redirect non-admins to home page
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    // Matcher ignoring static files and api routes that don't need auth (unless we want to protect API too)
    // For now, let's strictly protect pages.
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
