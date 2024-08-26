import { LoginType } from "@/backend/types/authTypes";
import { prisma } from "@/lib/prisma";

class LoginRepository {
    constructor(private readonly db = prisma) {}

    async login(body: LoginType) {
        const user = await this.db.user.findFirst({
            where: { email: body.email },
        });
        if (!user) {
            return {
                status: "error",
                statusCode: 404,
                message: "Sorry, User not found...",
            };
        }

        return { message: "okkkkk" };
    }
}

export default LoginRepository;
