import { PrismaClient } from "@prisma/client";

export default class PrismaService {
    private prisma;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getClient() {
        return this.prisma;
    }
}
