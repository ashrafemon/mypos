import AuthService from "@/backend/lib/AuthService";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const authService = new AuthService();
    const isAuthenticated = await authService.isAuthenticate();
    if (!isAuthenticated) {
        return authService.unAuthenticate();
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/api/v1/stores/:path*"],
};
