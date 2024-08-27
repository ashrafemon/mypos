import HelperService from "@/backend/lib/HelperService";
import PrismaService from "@/backend/lib/PrismaService";
import { LoginType } from "@/backend/types/authTypes";

export default class LoginRepository {
    private helper;
    private db;

    constructor() {
        this.db = new PrismaService().getClient();
        this.helper = new HelperService();
    }

    async login(body: LoginType) {
        const user = await this.db.user.findFirst({
            where: { email: body.email },
        });
        if (!user) {
            return this.helper.errorResponse({
                message: "Sorry, User not found...",
            });
        }

        return this.helper.entityResponse({ data: user });
    }
}
