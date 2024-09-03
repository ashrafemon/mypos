import LoginController from "@/backend/controllers/auth/LoginController";
import HelperService from "@/backend/lib/HelperService";
import { NextRequest } from "next/server";

export function POST(request: NextRequest) {
    const helper = new HelperService();

    try {
        const controller = new LoginController();
        return controller.logout();
    } catch (err: { message: string } | any) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
