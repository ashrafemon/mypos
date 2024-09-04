import * as jose from "jose";
import { cookies } from "next/headers";
import HelperService from "./HelperService";

class AuthService {
    private token: string | any;
    private user: any;
    private helper;
    private isAuthenticated: boolean = false;

    constructor() {
        this.token = cookies().get("authToken")?.value;
        this.helper = new HelperService();
    }

    check() {
        return this.isAuthenticated;
    }

    async verifyAuth() {
        if (!this.token) {
            return;
        }

        const jwtConfig = {
            secret: new TextEncoder().encode(
                process.env.NEXT_PUBLIC_JWT_SECRET!
            ),
        };

        const decoded = await jose.jwtVerify(this.token, jwtConfig.secret);
        const expAt = decoded.payload.exp;
        if (!expAt) {
            this.isAuthenticated = false;
            return;
        }

        const isLive = new Date(expAt * 1000) > new Date();
        if (!isLive) {
            this.isAuthenticated = false;
            return;
        }

        this.setAuthUser(decoded.payload);
        this.isAuthenticated = true;
        return this;
    }

    unAuthenticate() {
        return this.helper.errorResponse({
            statusCode: 401,
            message: "Sorry, you are unauthenticated",
        });
    }

    authUser() {
        return this.user;
    }

    setAuthUser(value: object | null) {
        const keys = [
            "id",
            "name",
            "email",
            "phone",
            "gender",
            "avatar",
            "selectedStoreId",
        ];

        if (!value) {
            return;
        }

        const payload = {};
        Object.keys(value).forEach((key: string) => {
            if (keys.includes(key)) {
                (payload as any)[key] = (value as any)[key];
            }
        });
        this.user = payload;
    }
}

export default AuthService;
