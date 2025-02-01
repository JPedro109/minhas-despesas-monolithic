import { CustomerEntity } from "@/layers/domain";
import { ICustomerRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaCustomerRepositoryAdapter implements ICustomerRepository {
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
        const customerCreated = await this.context.prismaCustomer.create({
            data: {
                id: customer.id,
                userId: customer.userId,
                customerId: customer.customerId,
                createdAt: customer.createdAt,
            },
        });

        return PrismaMapperHelper.toCustomerEntity(customerCreated);
    }

    async getCustomerByUserId(userId: string): Promise<CustomerEntity | null> {
        const customer = await this.context.prismaCustomer.findUnique({
            where: {
                userId,
            },
        });

        if (!customer) return null;

        return PrismaMapperHelper.toCustomerEntity(customer);
    }

    async getCustomerByCustomerId(
        customerId: string,
    ): Promise<CustomerEntity | null> {
        const customer = await this.context.prismaCustomer.findFirst({
            where: {
                customerId,
            },
        });

        if (!customer) return null;

        return PrismaMapperHelper.toCustomerEntity(customer);
    }

    async getCustomersByUserIds(userIds: string[]): Promise<CustomerEntity[]> {
        const prismaCustomers = await this.context.prismaCustomer.findMany({
            where: {
                userId: {
                    in: userIds,
                },
            },
        });

        return prismaCustomers.map((prismaCustomer) =>
            PrismaMapperHelper.toCustomerEntity(prismaCustomer),
        );
    }
}
