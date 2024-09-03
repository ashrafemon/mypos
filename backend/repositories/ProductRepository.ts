import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/products";
import { DynamicObjectTypes } from "../types/baseTypes";

export default class ProductRepository {
    private helper;
    private db;

    constructor() {
        this.db = new PrismaService().getClient();
        this.helper = new HelperService();
    }

    async index(queries: any) {
        let fields = {};
        const offset = Number(queries.offset) || 1;
        const limit = Number(queries.limit) || 10;
        const condition: { [key: string]: string | any } = {
            deletedAt: { equals: null },
        };

        if (queries.fields && queries.fields.length) {
            fields = this.helper.pickDataAsBoolean(queries.fields) || {};
        } else {
            fields = {
                id: true,
                name: true,
                code: true,
                type: true,
                price: true,
                status: true,
                category: {
                    select: {
                        name: true,
                    },
                },
            };
        }

        if (queries.status) {
            condition["status"] = queries.status;
        }
        if (queries.storeId) {
            condition["storeId"] = queries.storeId;
        }

        if (queries.get_all && Number(queries.get_all) === 1) {
            const docs = await this.db.product.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.product.count({ where: condition }),
                this.db.product.findMany({
                    select: fields,
                    where: condition,
                    skip: offset - 1,
                    take: limit,
                    orderBy: [{ order: "desc" }],
                }),
            ]);

            return this.helper.entityResponse({
                data: this.helper.paginate(count, docs, offset, limit),
            });
        }
    }

    async store(body: any) {
        const validate = await new ValidateService(StoreRules, body).validate();
        if (validate?.fails()) {
            return this.helper.entityResponse({
                status: "validateError",
                statusCode: 422,
                message: "Validation error occurred",
                data: validate.errors(),
            });
        }

        const payload = { ...validate?.validated(), deletedAt: null };
        if (body.code && body.barcodeSymbology) {
            payload["barcode"] = this.helper.buildBarcode(
                body.code,
                body.barcodeSymbology
            );
        }

        await this.db.product.create({ data: payload });
        return this.helper.entityResponse({
            statusCode: 201,
            message: "Product added successfully...",
        });
    }

    async show(id: string, queries: any) {
        let fields = {};
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        if (queries.fields && queries.fields.length) {
            fields = this.helper.pickDataAsBoolean(queries.fields) || {};
        } else {
            fields = {
                id: true,
                supplierId: true,
                categoryId: true,
                brandId: true,
                unitId: true,
                taxRateId: true,
                boxId: true,
                type: true,
                name: true,
                code: true,
                barcodeSymbology: true,
                barcode: true,
                price: true,
                discount: true,
                loyaltyPoint: true,
                alertQuantity: true,
                warranty: true,
                taxMethod: true,
                description: true,
                attachment: true,
                order: true,
                status: true,
            };
        }

        const doc = await this.db.product.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Product not found...",
            });
        }
        return this.helper.entityResponse({ data: doc });
    }

    async update(id: string, body: any) {
        const validate = await new ValidateService(
            UpdateRules,
            body
        ).validate();
        if (validate?.fails()) {
            return this.helper.entityResponse({
                status: "validateError",
                statusCode: 422,
                message: "Validation error occurred",
                data: validate.errors(),
            });
        }

        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };
        const doc = await this.db.product.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Product not found...",
            });
        }

        const payload = { ...validate?.validated() };
        payload["barcode"] = this.helper.buildBarcode(
            body.code !== doc.code ? body.code : doc.code,
            body.barcodeSymbology !== doc.barcodeSymbology
                ? body.barcodeSymbology
                : doc.barcodeSymbology
        );

        await this.db.product.update({
            where: { id: doc.id },
            data: payload,
        });
        return this.helper.entityResponse({
            message: "Product updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.product.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Product not found...",
            });
        }
        await this.db.product.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });
        return this.helper.entityResponse({
            message: "Product deleted successfully...",
        });
    }
}
