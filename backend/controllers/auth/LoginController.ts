import LoginRepository from "@/backend/repositories/auth/LoginRepository";
import { LoginType } from "@/backend/types/authTypes";

export default class LoginController {
    constructor(private readonly repository = new LoginRepository()) {}

    async login(body: LoginType) {
        return await this.repository.login(body);
    }

    storeLogin() {}

    me() {}

    logout() {}
}
