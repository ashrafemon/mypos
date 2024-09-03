import LoginController from "@/backend/controllers/auth/LoginController";
import HelperService from "@/backend/lib/HelperService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const helper = new HelperService();

    try {
        const controller = new LoginController();
        return await controller.userStores();
    } catch (err: { message: string } | any) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
