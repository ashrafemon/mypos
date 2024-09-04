import { createCanvas } from "canvas";
import jsBarcode from "jsbarcode";
import { NextResponse } from "next/server";

export default class HelperService {
    entityResponse({
        status = "success",
        statusCode = 200,
        message = null,
        data,
    }: {
        status?: string;
        statusCode?: number;
        message?: string | null;
        data?: any;
    }) {
        return NextResponse.json(
            { status, statusCode, message, data },
            { status: statusCode }
        );
    }

    errorResponse({
        status = "error",
        statusCode = 404,
        message = "Sorry, Item not found...",
        data,
    }: {
        status?: string;
        statusCode?: number;
        message?: string | null;
        data?: any;
    }) {
        return NextResponse.json(
            { status, statusCode, message, data },
            { status: statusCode }
        );
    }

    /**
     * Data Manipulate
     *
     * paginate, pickDataAsBoolean
     */

    getQueryStrings(value: string) {
        const url = new URL(value);
        const searchQueries = new URLSearchParams(url.searchParams);
        return Object.fromEntries(searchQueries.entries());
    }

    paginate(
        count: number = 0,
        data: any,
        offset: number = 1,
        limit: number = 10
    ) {
        return {
            data: data,
            current_page: Number(offset),
            first_page: 1,
            last_page: Math.ceil(Number(count) / Number(limit)) || 1,
            per_page: Number(limit),
            to: Number(offset) * Number(limit),
            total: Number(count),
        };
    }

    pickDataAsBoolean(value: string | string[]) {
        const result: { [key: string]: any } = {};
        if (typeof value === "string") {
            const items = value.split(",");
            items.forEach((item) => (result[item] = true));
        } else if (Array.isArray(value)) {
            const items = value.toString().split(",");
            items.forEach((item) => (result[item] = true));
        }
        return result;
    }

    buildBarcode(value: string, symbology: string = "code39") {
        const svg = createCanvas(400, 10);
        jsBarcode(svg, value, {
            format: symbology.toUpperCase(),
        });
        return svg.toDataURL("image/png");
    }
}
