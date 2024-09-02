import RegisterRepository from "@/backend/repositories/auth/RegisterRepository";
import { RegisterType } from "@/backend/types/authTypes";

export default class RegisterController {
    constructor(private readonly repository = new RegisterRepository()) {}

    async register(body: RegisterType) {
        return await this.repository.register(body);
    }
}
