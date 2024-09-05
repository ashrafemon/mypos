import AuthService from "@/backend/lib/AuthService";
import HelperService from "@/backend/lib/HelperService";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const helper = new HelperService();
    const authService = await new AuthService().verifyAuth();

    if (
        request.nextUrl.pathname.includes("api") &&
        (request.nextUrl.pathname.includes("store-login") ||
            request.nextUrl.pathname.includes("user-stores") ||
            request.nextUrl.pathname.includes("stores") ||
            request.nextUrl.pathname.includes("logout"))
    ) {
        if (!authService?.check()) {
            return authService?.unAuthenticate();
        }
        const authUser = authService.authUser();

        if (
            request.nextUrl.pathname.includes("stores") &&
            !request.nextUrl.pathname.includes("user-stores") &&
            !authUser.selectedStoreId
        ) {
            return helper.errorResponse({
                statusCode: 403,
                message: "Sorry, You are not permitted to access this store",
            });
        }

        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/api/v1/stores/:path*", "/api/v1/auth/:path*"],
};
