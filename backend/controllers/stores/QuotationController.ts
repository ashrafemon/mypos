import QuotationRepository from "@/backend/repositories/QuotationRepository";

export default class QuotationController {
    constructor(private readonly repository = new QuotationRepository()) {}

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
