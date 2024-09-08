import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/quotations";
import { DynamicObjectTypes } from "../types/baseTypes";
import { QuotationProductType } from "../types/quotationTypes";

export default class QuotationRepository {
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
                // refNo: true,
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
            const docs = await this.db.quotation.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.quotation.count({ where: condition }),
                this.db.quotation.findMany({
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
            customerId,
            // refNo,
            date,
            discount,
            otherCharge,
            subtotal,
            total,
            description,
            attachment,
            status,
        } = validate?.validated();

        const quotation = await this.db.quotation.create({
            data: {
                storeId,
                customerId,
                // refNo,
                date,
                discount,
                otherCharge,
                subtotal,
                total,
                description,
                attachment,
                status,
                invoiceNo: `QUO_${Math.floor(100000 + Math.random() * 900000)}`,
                deletedAt: null,
            },
        });

        const products = validate
            ?.validated()
            .products.map((p: QuotationProductType) => ({
                ...p,
                storeId: storeId,
                quotationId: quotation.id,
                deletedAt: null,
            }));

        await this.db.quotationProduct.createMany({ data: products });

        return this.helper.entityResponse({
            statusCode: 201,
            message: "Quotation added successfully...",
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
                customerId: true,
                // refNo: true,
                invoiceNo: true,
                date: true,
                discount: true,
                otherCharge: true,
                subtotal: true,
                total: true,
                description: true,
                attachment: true,
                status: true,
                quotationProducts: {
                    select: {
                        id: true,
                        productId: true,
                        productName: true,
                        quantity: true,
                        amount: true,
                        total: true,
                    },
                },
            };
        }

        const doc = await this.db.quotation.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Quotation not found...",
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
        const doc = await this.db.quotation.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Quotation not found...",
            });
        }

        const {
            customerId,
            // refNo,
            date,
            discount,
            otherCharge,
            subtotal,
            total,
            description,
            attachment,
            status,
        } = validate?.validated();

        await this.db.quotation.update({
            where: { id: doc.id },
            data: {
                customerId,
                // refNo,
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

        validate
            ?.validated()
            .products.map(async (item: QuotationProductType) => {
                if (item.id) {
                    entryProducts.push(item.id);
                    await this.db.quotationProduct.update({
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
                    const product = await this.db.quotationProduct.create({
                        data: {
                            storeId: doc.storeId,
                            quotationId: doc.id,
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

        await this.db.quotationProduct.deleteMany({
            where: {
                quotationId: doc.id,
                // storeId: storeId,
                id: { notIn: entryProducts },
            },
        });

        return this.helper.entityResponse({
            message: "Quotation updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.quotation.findFirst({
            where: condition,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Quotation not found...",
            });
        }

        await this.db.quotation.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        await this.db.quotationProduct.updateMany({
            where: { quotationId: doc.id },
            data: { deletedAt: moment().toDate() },
        });

        return this.helper.entityResponse({
            message: "Quotation deleted successfully...",
        });
    }
}
