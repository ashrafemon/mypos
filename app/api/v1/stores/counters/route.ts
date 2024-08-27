import CounterController from "@/backend/controllers/stores/CounterController";
import HelperService from "@/backend/lib/HelperService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const helper = new HelperService();

    try {
        const queries = helper.getQueryStrings(request.url);
        const controller = new CounterController();
        return await controller.index(queries);
    } catch (err) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}

export async function POST(request: NextRequest) {
    const helper = new HelperService();

    try {
        const body = await request.json();
        const controller = new CounterController();
        return await controller.store(body);
    } catch (err) {
        console.log(err);
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
