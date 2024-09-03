import ProductCategoryController from "@/backend/controllers/stores/ProductCategoryController";
import AuthService from "@/backend/lib/AuthService";
import HelperService from "@/backend/lib/HelperService";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const helper = new HelperService();

    try {
        const authService = await new AuthService().verifyAuth();
        const authUser = authService?.authUser();

        const queries = helper.getQueryStrings(request.url);
        const controller = new ProductCategoryController();
        return await controller.index({
            ...queries,
            storeId: authUser?.selectedStoreId,
        });
    } catch (err: { message: string } | any) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}

export async function POST(request: NextRequest) {
    const helper = new HelperService();

    try {
        const authService = await new AuthService().verifyAuth();
        const authUser = authService?.authUser();

        const body = await request.json();
        const controller = new ProductCategoryController();
        return await controller.store({
            ...body,
            storeId: authUser?.selectedStoreId,
        });
    } catch (err: { message: string } | any) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
