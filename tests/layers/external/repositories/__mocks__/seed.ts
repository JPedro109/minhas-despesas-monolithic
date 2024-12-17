import { 
    DatabaseSQLHelper, 
    PrismaCustomerRepositoryAdapter, 
    PrismaExpenseRepositoryAdapter, 
    PrismaUserRepositoryAdapter 
} from "@/layers/external";

import { testCustomerEntity, testExpenseEntityPaid, testUserEntity, testUserEntityTwo } from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaCustomerRepository: PrismaCustomerRepositoryAdapter;
    private readonly prismaExpenseRepository: PrismaExpenseRepositoryAdapter;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(this.databaseSQLHelper);
        this.prismaCustomerRepository = new PrismaCustomerRepositoryAdapter(this.databaseSQLHelper);
        this.prismaExpenseRepository = new PrismaExpenseRepositoryAdapter(this.databaseSQLHelper);
    }

    async populate(): Promise<void> {
        await this.prismaUserRepository.createUser(testUserEntity());
        await this.prismaCustomerRepository.createCustomer(testCustomerEntity());
        await this.prismaExpenseRepository.createExpense(testExpenseEntityPaid());

        await this.prismaUserRepository.createUser(testUserEntityTwo());
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});
    }
}