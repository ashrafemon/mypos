import AuthService from "@/backend/lib/AuthService";
import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import ValidateService from "@/backend/lib/ValidateService";
import { LoginRules } from "@/backend/rules/auth";
import { LoginType, StoreLoginType } from "@/backend/types/authTypes";
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

    async storeLogin(body: StoreLoginType) {
        if (!body.storeId) {
            return this.helper.errorResponse({
                statusCode: 400,
                message: "Sorry, Please select a store",
            });
        }

        const authService = new AuthService();
        await authService.verifyAuth();
        const authUser = authService.authUser();

        const storeUser = await this.db.storeUser.count({
            where: { userId: authUser.id, storeId: body.storeId },
        });

        if (!storeUser) {
            return this.helper.errorResponse({
                statusCode: 403,
                message:
                    "Sorry, You don't have permission to access this store",
            });
        }

        const token = jwt.sign(
            { ...authUser, selectedStoreId: body.storeId },
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
            message: "Store login successful",
        });
    }

    async userStores() {
        const authService = new AuthService();
        await authService.verifyAuth();
        const authUser = authService.authUser();

        const storeUser = await this.db.storeUser.findMany({
            select: { storeId: true },
            where: { userId: authUser.id },
        });

        const storeIds = storeUser.map(
            (item: { storeId: string }) => item.storeId
        );

        const stores = await this.db.store.findMany({
            select: { id: true, name: true },
            where: { id: { in: storeIds } },
        });

        return this.helper.entityResponse({
            data: stores,
        });
    }

    logout() {
        cookies().delete("authToken");
        return this.helper.entityResponse({
            message: "Logout successful",
        });
    }
}
