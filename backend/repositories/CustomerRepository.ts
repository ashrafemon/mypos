import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import moment from "moment";
import ValidateService from "../lib/ValidateService";
import { StoreRules, UpdateRules } from "../rules/customers";
import { DynamicObjectTypes } from "../types/baseTypes";

export default class CustomerRepository {
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
                phone: true,
                email: true,
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
            const docs = await this.db.customer.findMany({
                select: fields,
                where: condition,
            });

            return this.helper.entityResponse({ data: docs });
        } else {
            const [count, docs] = await this.db.$transaction([
                this.db.customer.count({ where: condition }),
                this.db.customer.findMany({
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

        await this.db.customer.create({
            data: { ...validate?.validated(), deletedAt: null },
        });
        return this.helper.entityResponse({
            statusCode: 201,
            message: "Customer added successfully...",
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
                groupId: true,
                id: true,
                type: true,
                name: true,
                phone: true,
                email: true,
                dob: true,
                address: true,
                attachment: true,
                discount: true,
                order: true,
                status: true,
            };
        }

        const doc = await this.db.customer.findFirst({
            where: condition,
            select: fields,
        });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Customer not found...",
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
        const doc = await this.db.customer.findFirst({ where: condition });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Customer not found...",
            });
        }

        await this.db.customer.update({
            where: { id: doc.id },
            data: validate?.validated(),
        });
        return this.helper.entityResponse({
            message: "Customer updated successfully...",
        });
    }

    async destroy(id: string) {
        const condition: DynamicObjectTypes = {
            id: id,
            deletedAt: { equals: null },
        };

        const doc = await this.db.customer.findFirst({ where: condition });
        if (!doc) {
            return this.helper.errorResponse({
                message: "Customer not found...",
            });
        }
        await this.db.customer.update({
            where: { id: doc.id },
            data: { deletedAt: moment().toDate() },
        });
        return this.helper.entityResponse({
            message: "Customer deleted successfully...",
        });
    }
}
