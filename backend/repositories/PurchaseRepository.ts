import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/purchases";
import { DynamicObjectTypes } from "../types/baseTypes";
import {
    PurchasePaymentType,
    PurchaseProductType,
} from "../types/purchaseTypes";

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
                purchasePayments: { select: { amount: true } },
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
                refNo: true,
                invoiceNo: true,
                date: true,
                discount: true,
                otherCharge: true,
                subtotal: true,
                total: true,
                description: true,
                attachment: true,
                status: true,
                purchaseProducts: {
                    select: {
                        id: true,
                        productId: true,
                        productName: true,
                        quantity: true,
                        amount: true,
                        total: true,
                        // expireAt: true,
                    },
                },
                purchasePayments: {
                    select: {
                        id: true,
                        methodId: true,
                        methodName: true,
                        amount: true,
                    },
                },
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

        await this.db.purchase.update({
            where: { id: doc.id },
            data: {
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
            },
        });

        const entryProducts: string[] = [];
        const entryPayments: string[] = [];

        validate
            ?.validated()
            .products.map(async (item: PurchaseProductType) => {
                if (item.id) {
                    entryProducts.push(item.id);
                    await this.db.purchaseProduct.update({
                        where: { id: item.id },
                        data: {
                            productId: item.productId,
                            productName: item.productName,
                            quantity: item.quantity,
                            amount: item.amount,
                            total: item.total,
                        },
                    });
                } else {
                    const product = await this.db.purchaseProduct.create({
                        data: {
                            storeId: doc.storeId,
                            purchaseId: doc.id,
                            productId: item.productId,
                            productName: item.productName,
                            quantity: item.quantity,
                            amount: item.amount,
                            total: item.total,
                            deletedAt: null,
                        },
                    });
                    entryProducts.push(product.id);
                }
            });

        validate
            ?.validated()
            .payments.map(async (item: PurchasePaymentType) => {
                if (item.id) {
                    entryPayments.push(item.id);
                    await this.db.purchasePayment.update({
                        where: { id: item.id },
                        data: {
                            methodId: item.methodId,
                            methodName: item.methodName,
                            amount: item.amount,
                        },
                    });
                } else {
                    const payment = await this.db.purchasePayment.create({
                        data: {
                            storeId: storeId,
                            purchaseId: doc.id,
                            methodId: item.methodId,
                            methodName: item.methodName,
                            amount: item.amount,
                            deletedAt: null,
                        },
                    });
                    entryPayments.push(payment.id);
                }
            });

        await this.db.purchaseProduct.deleteMany({
            where: {
                purchaseId: doc.id,
                // storeId: storeId,
                id: { notIn: entryProducts },
            },
        });
        await this.db.purchasePayment.deleteMany({
            where: {
                purchaseId: doc.id,
                // storeId: storeId,
                id: { notIn: entryPayments },
            },
        });

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
