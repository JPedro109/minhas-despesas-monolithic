import { PrismaClient } from "@prisma/client";

export class DatabaseSQLHelper {
    public readonly client: PrismaClient = new PrismaClient();

    async connect(): Promise<void> {
        await this.client.$connect();
    }

    async disconnect(): Promise<void> {
        await this.client.$disconnect();
    }
}
