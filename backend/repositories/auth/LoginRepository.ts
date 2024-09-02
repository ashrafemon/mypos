import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import ValidateService from "@/backend/lib/ValidateService";
import { LoginRules } from "@/backend/rules/auth";
import { LoginType } from "@/backend/types/authTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default class LoginRepository {
    private helper;
    private db;

    constructor() {
        this.db = new PrismaService().getClient();
        this.helper = new HelperService();
    }

    async login(body: LoginType) {
        const validate = await new ValidateService(LoginRules, body).validate();
        if (validate?.fails()) {
            return this.helper.entityResponse({
                status: "validateError",
                statusCode: 422,
                message: "Validation error occurred",
                data: validate.errors(),
            });
        }

        const searchKey = body.user.includes("@") ? "email" : "phone";

        const user = await this.db.user.findFirst({
            where: { [searchKey]: body.user },
        });
        if (!user) {
            return this.helper.errorResponse({
                status: "validateError",
                statusCode: 422,
                message: "Validation error occurred",
                data: { user: "Sorry, User not found..." },
            });
        }

        if (!user.loginPermit) {
            return this.helper.errorResponse({
                statusCode: 403,
                message: "Sorry, You don't have login permission...",
            });
        }

        try {
            const passwordMatch = await bcrypt.compare(
                body.password,
                user.password
            );
            if (!passwordMatch) {
                return this.helper.errorResponse({
                    status: "validateError",
                    statusCode: 422,
                    message: "Validation error occurred",
                    data: { password: "Password not matched" },
                });
            }
        } catch (err: { message: string } | any) {
            return this.helper.errorResponse({
                statusCode: 500,
                message: err.message,
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar,
                gender: user.gender,
            },
            process.env.NEXT_PUBLIC_JWT_SECRET!,
            { expiresIn: "1h" }
        );

        cookies().set({
            name: "authToken",
            value: token,
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 365 * 1000,
            expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000),
        });

        return this.helper.entityResponse({
            data: token,
            message: "Login successful",
        });
    }
}
