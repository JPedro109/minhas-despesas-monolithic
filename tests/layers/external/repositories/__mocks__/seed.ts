import { DatabaseSQLHelper, PrismaCustomerRepositoryAdapter } from "@/layers/external";
import { PrismaUserRepositoryAdapter } from "@/layers/external";

import { testCustomerEntity, testUserEntity, testUserEntityTwo } from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaCustomerRepository: PrismaCustomerRepositoryAdapter;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(this.databaseSQLHelper);
        this.prismaCustomerRepository = new PrismaCustomerRepositoryAdapter(this.databaseSQLHelper);
    }

    async populate(): Promise<void> {
        await this.prismaUserRepository.createUser(testUserEntity());
        await this.prismaCustomerRepository.createCustomer(testCustomerEntity());

        await this.prismaUserRepository.createUser(testUserEntityTwo());
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});
    }
}