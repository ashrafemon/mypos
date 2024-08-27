import TaxRateController from "@/backend/controllers/stores/TaxRateController";
import HelperService from "@/backend/lib/HelperService";
import { DynamicObjectTypes } from "@/backend/types/baseTypes";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: DynamicObjectTypes }
) {
    const helper = new HelperService();

    try {
        const { id } = context.params;
        const queries = helper.getQueryStrings(request.url);
        const controller = new TaxRateController();
        return await controller.show(id, queries);
    } catch (err) {
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}

export async function PATCH(
    request: NextRequest,
    context: { params: DynamicObjectTypes }
) {
    const helper = new HelperService();

    try {
        const { id } = context.params;
        const body = await request.json();
        const controller = new TaxRateController();
        return await controller.update(id, body);
    } catch (err) {
        console.log(err);
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: DynamicObjectTypes }
) {
    const helper = new HelperService();

    try {
        const { id } = context.params;
        const controller = new TaxRateController();
        return await controller.destroy(id);
    } catch (err) {
        console.log(err);
        return helper.errorResponse({
            statusCode: 500,
            message: err?.message,
        });
    }
}
