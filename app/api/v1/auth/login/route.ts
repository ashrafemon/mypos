import LoginController from "@/backend/controllers/auth/LoginController";
import HelperService from "@/backend/lib/HelperService";
import { LoginType } from "@/backend/types/authTypes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const helper = new HelperService();

    try {
        const body: LoginType = await request.json();
        const controller = new LoginController();
        return await controller.login(body);
    } catch (err) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
