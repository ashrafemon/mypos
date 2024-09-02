import * as jose from "jose";
import { cookies } from "next/headers";
import HelperService from "./HelperService";

class AuthService {
    private token: string | any;
    private user: any;
    private helper;

    constructor() {
        this.token = cookies().get("authToken")?.value;
        this.helper = new HelperService();
    }

    async isAuthenticate() {
        const jwtConfig = {
            secret: new TextEncoder().encode(
                process.env.NEXT_PUBLIC_JWT_SECRET!
            ),
        };
        const decoded = await jose.jwtVerify(this.token, jwtConfig.secret);

        if (!decoded.payload.exp) {
            return false;
        }

        const isLive = new Date(decoded.payload.exp * 1000) > new Date();
        if (!isLive) {
            return false;
        }

        this.user = decoded.payload;
        return true;
    }

    authUser() {
        return this.user;
    }

    unAuthenticate() {
        return this.helper.errorResponse({
            statusCode: 401,
            message: "Sorry, you are unauthenticated",
        });
    }
}

export default AuthService;
