import RegisterController from "@/backend/controllers/auth/RegisterController";
import HelperService from "@/backend/lib/HelperService";
import { RegisterType } from "@/backend/types/authTypes";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const helper = new HelperService();

    try {
        const body: RegisterType = await request.json();
        const controller = new RegisterController();
        return await controller.register(body);
    } catch (err: { message: string } | any) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
