import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/taxRates";
import { DynamicObjectTypes } from "../types/baseTypes";

export default class TaxRateRepository {
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
            fields = { id: true, name: true, rate: true, status: true };
        }

        if (queries.status) {
            condition["status"] = queries.status;
        }
        if (queries.storeId) {
            condition["storeId"] = queries.storeId;
        }

        if (queries.get_all && Number(queries.get_all) === 1) {
            const docs = await this.db.taxRate.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.taxRate.count({ where: condition }),
                this.db.taxRate.findMany({
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

        await this.db.taxRate.create({
            data: { ...validate?.validated(), deletedAt: null },
        });
        return this.helper.entityResponse({
            statusCode: 201,
            message: "Tax rate added successfully...",
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
                name: true,
                rate: true,
                description: true,
                order: true,
                status: true,
            };
        }

        const doc = await this.db.taxRate.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Tax Rate not found...",
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

        const doc = await this.db.taxRate.findFirst({ where: condition });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Tax rate not found...",
            });
        }

        await this.db.taxRate.update({
            where: { id: doc.id },
            data: validate?.validated(),
        });
        return this.helper.entityResponse({
            message: "Tax rate updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.taxRate.findFirst({ where: condition });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Tax rate not found...",
            });
        }
        await this.db.taxRate.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });
        return this.helper.entityResponse({
            message: "Tax rate deleted successfully...",
        });
    }
}
