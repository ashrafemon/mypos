import LoginRepository from "@/backend/repositories/auth/LoginRepository";
import { LoginType, StoreLoginType } from "@/backend/types/authTypes";

export default class LoginController {
    constructor(private readonly repository = new LoginRepository()) {}

    async login(body: LoginType) {
        return await this.repository.login(body);
    }

    async storeLogin(body: StoreLoginType) {
        return await this.repository.storeLogin(body);
    }

    async userStores() {
        return await this.repository.userStores();
    }

    me() {}

    logout() {
        return this.repository.logout();
    }
}
