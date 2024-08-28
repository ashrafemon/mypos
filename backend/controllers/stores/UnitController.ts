import UnitRepository from "@/backend/repositories/UnitRepository";

export default class UnitController {
    constructor(private readonly repository = new UnitRepository()) {}

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
