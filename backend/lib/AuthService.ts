import jwt from "jsonwebtoken";
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

    isAuthenticate() {
        try {
            const verify: { exp: number } | any = jwt.verify(
                this.token,
                process.env.NEXT_PUBLIC_JWT_SECRET!
            );

            if (!verify.exp) {
                return false;
            }
            const isLive = new Date(verify.exp * 1000) > new Date();
            if (!isLive) {
                return false;
            }
            this.authUser = verify;
            return true;
        } catch (err: { message: string } | any) {
            return false;
        }
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
