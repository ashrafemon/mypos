import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/sales";
import { DynamicObjectTypes } from "../types/baseTypes";
import { SalePaymentType, SaleProductType } from "../types/saleTypes";

export default class SaleRepository {
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
                invoiceNo: true,
                date: true,
                total: true,
                status: true,
                customer: {
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
            const docs = await this.db.sale.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.sale.count({ where: condition }),
                this.db.sale.findMany({
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
            counterId,
            customerId,
            date,
            discount,
            otherCharge,
            orderTax,
            subtotal,
            total,
            description,
            attachment,
            status,
        } = validate?.validated();

        const sale = await this.db.sale.create({
            data: {
                storeId,
                customerId,
                counterId,
                date,
                discount,
                otherCharge,
                orderTax,
                subtotal,
                total,
                description,
                attachment,
                status,
                invoiceNo: `INV_${Math.floor(100000 + Math.random() * 900000)}`,
                deletedAt: null,
            },
        });

        const products = validate
            ?.validated()
            .products.map((p: SaleProductType) => ({
                ...p,
                storeId: storeId,
                saleId: sale.id,
                deletedAt: null,
            }));
        if (products.length > 0) {
            await this.db.saleProduct.createMany({ data: products });
        }

        const payments = validate
            ?.validated()
            .payments.map((p: SalePaymentType) => ({
                ...p,
                storeId: storeId,
                saleId: sale.id,
                deletedAt: null,
            }));
        if (payments.length > 0) {
            await this.db.salePayment.createMany({ data: payments });
        }

        return this.helper.entityResponse({
            statusCode: 201,
            message: "Sale added successfully...",
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
                saleProducts: {
                    select: {
                        id: true,
                        productId: true,
                        name: true,
                        code: true,
                        price: true,
                        discount: true,
                        taxMethod: true,
                        taxRate: true,
                        quantity: true,
                        total: true,
                    },
                },
                salePayments: {
                    select: {
                        id: true,
                        methodId: true,
                        name: true,
                        transactionNo: true,
                        amount: true,
                        note: true,
                    },
                },
            };
        }

        const doc = await this.db.sale.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Sale not found...",
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
        const doc = await this.db.sale.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Sale not found...",
            });
        }

        const {
            customerId,
            counterId,
            date,
            discount,
            otherCharge,
            orderTax,
            subtotal,
            total,
            description,
            attachment,
            status,
        } = validate?.validated();

        await this.db.sale.update({
            where: { id: doc.id },
            data: {
                customerId,
                counterId,
                date,
                discount,
                otherCharge,
                orderTax,
                subtotal,
                total,
                description,
                attachment,
                status,
            },
        });

        const entryProducts: string[] = [];
        const entryPayments: string[] = [];

        validate?.validated().products.map(async (item: SaleProductType) => {
            if (item.id) {
                entryProducts.push(item.id);
                await this.db.saleProduct.update({
                    where: { id: item.id },
                    data: {
                        productId: item.productId,
                        name: item.name,
                        code: item.code,
                        price: item.price,
                        discount: item.discount,
                        taxMethod: item.taxMethod,
                        taxRate: item.taxRate,
                        quantity: item.quantity,
                        total: item.total,
                    },
                });
            } else {
                const product = await this.db.saleProduct.create({
                    data: {
                        storeId: doc.storeId,
                        saleId: doc.id,
                        productId: item.productId,
                        name: item.name,
                        code: item.code,
                        price: item.price,
                        discount: item.discount,
                        taxMethod: item.taxMethod,
                        taxRate: item.taxRate,
                        quantity: item.quantity,
                        total: item.total,
                        deletedAt: null,
                    },
                });
                entryProducts.push(product.id);
            }
        });

        validate?.validated().payments.map(async (item: SalePaymentType) => {
            if (item.id) {
                entryPayments.push(item.id);
                await this.db.salePayment.update({
                    where: { id: item.id },
                    data: {
                        methodId: item.methodId,
                        name: item.name,
                        transactionNo: item.transactionNo,
                        amount: item.amount,
                        note: item.note,
                    },
                });
            } else {
                const payment = await this.db.salePayment.create({
                    data: {
                        storeId: doc.storeId,
                        saleId: doc.id,
                        methodId: item.methodId,
                        name: item.name,
                        transactionNo: item.transactionNo,
                        amount: item.amount,
                        note: item.note,
                        deletedAt: null,
                    },
                });
                entryPayments.push(payment.id);
            }
        });

        await this.db.saleProduct.deleteMany({
            where: {
                saleId: doc.id,
                // storeId: storeId,
                id: { notIn: entryProducts },
            },
        });
        await this.db.salePayment.deleteMany({
            where: {
                saleId: doc.id,
                // storeId: storeId,
                id: { notIn: entryPayments },
            },
        });

        return this.helper.entityResponse({
            message: "Sale updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.sale.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Sale not found...",
            });
        }

        await this.db.sale.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        await this.db.saleProduct.updateMany({
            where: { saleId: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        await this.db.salePayment.updateMany({
            where: { saleId: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        return this.helper.entityResponse({
            message: "Sale deleted successfully...",
        });
    }
}
