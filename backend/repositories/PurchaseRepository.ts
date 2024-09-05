import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/purchases";
import { DynamicObjectTypes } from "../types/baseTypes";

export default class PurchaseRepository {
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
                refNo: true,
                invoiceNo: true,
                date: true,
                total: true,
                status: true,
            };
        }

        if (queries.status) {
            condition["status"] = queries.status;
        }
        if (queries.storeId) {
            condition["storeId"] = queries.storeId;
        }

        if (queries.get_all && Number(queries.get_all) === 1) {
            const docs = await this.db.purchase.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.purchase.count({ where: condition }),
                this.db.purchase.findMany({
                    select: fields,
                    where: condition,
                    skip: offset - 1,
                    take: limit,
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

        const {
            storeId,
            supplierId,
            refNo,
            date,
            discount,
            otherCharge,
            subtotal,
            total,
            description,
            attachment,
            status,
        } = validate?.validated();

        const purchase = await this.db.purchase.create({
            data: {
                storeId,
                supplierId,
                refNo,
                date,
                discount,
                otherCharge,
                subtotal,
                total,
                description,
                attachment,
                status,
                invoiceNo: `PUR_${Math.floor(100000 + Math.random() * 900000)}`,
                deletedAt: null,
            },
        });

        const products = validate
            ?.validated()
            .products.map(
                (p: {
                    productId: number;
                    productName?: string;
                    quantity: number;
                    amount: number;
                    total: number;
                    expireAt: string;
                }) => ({
                    ...p,
                    storeId: storeId,
                    purchaseId: purchase.id,
                    deletedAt: null,
                })
            );

        const payments = validate
            ?.validated()
            .payments.map(
                (p: {
                    methodId: number;
                    methodName?: number;
                    transactionNo: number;
                    amount: number;
                }) => ({
                    ...p,
                    storeId: storeId,
                    purchaseId: purchase.id,
                    deletedAt: null,
                })
            );

        await this.db.purchaseProduct.createMany({ data: products });
        await this.db.purchasePayment.createMany({ data: payments });

        return this.helper.entityResponse({
            statusCode: 201,
            message: "Purchase added successfully...",
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
                invoiceNo: true,
                date: true,
                discount: true,
                otherCharge: true,
                description: true,
                attachment: true,
                status: true,
            };
        }

        const doc = await this.db.purchase.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Purchase not found...",
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
        const doc = await this.db.purchase.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Purchase not found...",
            });
        }

        return this.helper.entityResponse({
            message: "Purchase updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.purchase.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Purchase not found...",
            });
        }

        await this.db.purchase.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        await this.db.purchaseProduct.updateMany({
            where: { purchaseId: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        await this.db.purchasePayment.updateMany({
            where: { purchaseId: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        return this.helper.entityResponse({
            message: "Purchase deleted successfully...",
        });
    }
}
