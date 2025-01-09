import {
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
    PrismaExpenseRepositoryAdapter,
    PrismaExtractRepositoryAdapter,
    PrismaPaymentHistoryRepositoryAdapter,
    PrismaPaymentMethodRepositoryAdapter,
    PrismaSubscriptionRepositoryAdapter,
    PrismaUserRepositoryAdapter,
    PrismaUserVerificationCodeRepositoryAdapter,
} from "@/layers/external";

import {
    testCustomerEntity,
    testExpenseEntityPaid,
    testExtractEntity,
    testExtractEntityExpired,
    testPaymentHistoryEntity,
    testPaymentMethodEntity,
    testPlanFreeEntity,
    testSubscriptionEntity,
    testUserEntity,
    testUserEntityTwo,
    testUserVerificationCodeEntity,
} from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaCustomerRepository: PrismaCustomerRepositoryAdapter;
    private readonly prismaExpenseRepository: PrismaExpenseRepositoryAdapter;
    private readonly prismaExtractRepository: PrismaExtractRepositoryAdapter;
    private readonly prismaPaymentHistoryRepository: PrismaPaymentHistoryRepositoryAdapter;
    private readonly prismaPaymentMethodRepository: PrismaPaymentMethodRepositoryAdapter;
    private readonly prismaSubscriptionRepository: PrismaSubscriptionRepositoryAdapter;
    private readonly prismaUserVerificationCodeRepository: PrismaUserVerificationCodeRepositoryAdapter;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaCustomerRepository = new PrismaCustomerRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaExpenseRepository = new PrismaExpenseRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaExtractRepository = new PrismaExtractRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaPaymentHistoryRepository =
            new PrismaPaymentHistoryRepositoryAdapter(this.databaseSQLHelper);
        this.prismaPaymentMethodRepository =
            new PrismaPaymentMethodRepositoryAdapter(this.databaseSQLHelper);
        this.prismaSubscriptionRepository =
            new PrismaSubscriptionRepositoryAdapter(this.databaseSQLHelper);
        this.prismaUserVerificationCodeRepository =
            new PrismaUserVerificationCodeRepositoryAdapter(
                this.databaseSQLHelper,
            );
    }

    async populate(): Promise<void> {
        const plan = testPlanFreeEntity();
        const action = await this.databaseSQLHelper.client.prismaAction.create({
            data: {
                id: plan.actions[0].id,
                description: plan.actions[0].description,
                name: plan.actions[0].name,
                createdAt: plan.actions[0].createdAt,
                updatedAt: plan.actions[0].updatedAt,
            },
        });
        await this.databaseSQLHelper.client.prismaPlan.create({
            data: {
                id: plan.id,
                name: plan.name,
                description: plan.description,
                amount: plan.amount,
                createdAt: plan.createdAt,
                durationInDays: plan.durationInDays,
                updatedAt: plan.updatedAt,
                actions: {
                    connect: [{ id: action.id }],
                },
            },
        });

        await this.prismaUserRepository.createUser(testUserEntity());
        await this.prismaCustomerRepository.createCustomer(
            testCustomerEntity(),
        );
        await this.prismaExpenseRepository.createExpense(
            testExpenseEntityPaid(),
        );
        await this.prismaExtractRepository.createExtract(testExtractEntity());
        await this.prismaExtractRepository.createExtract(
            testExtractEntityExpired(),
        );
        await this.prismaPaymentHistoryRepository.createPaymentHistory(
            testPaymentHistoryEntity(),
        );
        await this.prismaPaymentMethodRepository.attachmentPaymentMethodInCustomer(
            testPaymentMethodEntity(),
        );
        await this.prismaSubscriptionRepository.createSubscription(
            testSubscriptionEntity(),
        );
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(),
        );

        await this.prismaUserRepository.createUser(testUserEntityTwo());
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});

        await this.databaseSQLHelper.client.prismaPlan.deleteMany({});
        await this.databaseSQLHelper.client.prismaAction.deleteMany({});
    }
}
