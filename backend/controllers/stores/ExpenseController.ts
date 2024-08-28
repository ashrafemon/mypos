import ExpenseRepository from "@/backend/repositories/ExpenseRepository";

export default class ExpenseController {
    constructor(private readonly repository = new ExpenseRepository()) {}

    async index(queries: any) {
        return await this.repository.index(queries);
    }

    async store(body: any) {
        return await this.repository.store(body);
    }

    async show(id: string, queries: any) {
        return await this.repository.show(id, queries);
    }

    async update(id: string, body: any) {
        return await this.repository.update(id, body);
    }

    async destroy(id: string) {
        return await this.repository.destroy(id);
    }
}
