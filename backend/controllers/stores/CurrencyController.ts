import CurrencyRepository from "@/backend/repositories/CurrencyRepository";

export default class CurrencyController {
    constructor(private readonly repository = new CurrencyRepository()) {}

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
