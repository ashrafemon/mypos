import bcrypt from "bcrypt";
import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import ValidateService from "@/backend/lib/ValidateService";
import { RegisterRules } from "@/backend/rules/auth";
import { RegisterType } from "@/backend/types/authTypes";

export default class RegisterRepository {
    private helper;
    private db;

    constructor() {
        this.db = new PrismaService().getClient();
        this.helper = new HelperService();
    }

    async register(body: RegisterType) {
        const validate = await new ValidateService(
            RegisterRules,
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

        const user = await this.db.user.count({
            where: { email: body.email },
        });
        if (user) {
            return this.helper.errorResponse({
                message: "Sorry, User already exists",
            });
        }

        const hash = await bcrypt.hash(body.password, 10);

        const payload = {
            ...validate?.validated(),
            password: hash,
        };

        await this.db.user.create({ data: payload });

        return this.helper.entityResponse({
            statusCode: 201,
            message: "User register successful",
        });
    }
}
