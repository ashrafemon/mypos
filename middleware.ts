import AuthService from "@/backend/lib/AuthService";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    if (
        request.nextUrl.pathname.includes("store-login") ||
        request.nextUrl.pathname.includes("user-stores") ||
        request.nextUrl.pathname.includes("logout") ||
        request.nextUrl.pathname.includes("stores")
    ) {
        const authService = new AuthService();
        await authService.verifyAuth();

        if (!authService.check()) {
            return authService.unAuthenticate();
        }

        request.auth = authService.authUser();
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/api/v1/stores/:path*", "/api/v1/auth/:path*"],
};
