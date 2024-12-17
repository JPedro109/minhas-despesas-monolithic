import { DatabaseSQLHelper } from "@/layers/external";
import { PrismaUserRepositoryAdapter } from "@/layers/external";

import { testUserEntity } from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(this.databaseSQLHelper);
    }

    async populate(): Promise<void> {
        await this.prismaUserRepository.createUser(testUserEntity());
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});
    }
}