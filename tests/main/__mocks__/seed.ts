import {
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
    PrismaPaymentMethodRepositoryAdapter,
    PrismaSubscriptionRepositoryAdapter,
    PrismaUserConsentRepositoryAdapter,
    PrismaUserRepositoryAdapter,
    StripeAdapter
} from "@/layers/external";

import {
    testPlanFreeEntity,
    testUserEntityWithPlanFree,
    testPlanGoldEntity,
    expenseActions,
    extractActions,
    testUserConsentEntity,
    testCustomerEntity,
    testSubscriptionEntityWithPlanFree,
    testPaymentMethodEntity
} from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaUserConsentRepository: PrismaUserConsentRepositoryAdapter;
    private readonly prismaCustomerRepository: PrismaCustomerRepositoryAdapter;
    private readonly prismaSubscriptionRepository: PrismaSubscriptionRepositoryAdapter;
    private readonly prismaPaymentMethodRepository: PrismaPaymentMethodRepositoryAdapter;

    private readonly stripeAdapter = new StripeAdapter();

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(this.databaseSQLHelper);
        this.prismaUserConsentRepository = new PrismaUserConsentRepositoryAdapter(this.databaseSQLHelper);
        this.prismaCustomerRepository = new PrismaCustomerRepositoryAdapter(this.databaseSQLHelper);
        this.prismaSubscriptionRepository = new PrismaSubscriptionRepositoryAdapter(this.databaseSQLHelper);
        this.prismaPaymentMethodRepository = new PrismaPaymentMethodRepositoryAdapter(this.databaseSQLHelper);
    }

    async populate(): Promise<void> {
        for (const action of [...expenseActions, ...extractActions]) {
            await this.databaseSQLHelper.client.prismaAction.create(
                {
                    data: {
                        id: action.id,
                        description: action.description,
                        name: action.name,
                        createdAt: action.createdAt
                    }
                }
            );
        }

        const planFree = testPlanFreeEntity();
        await this.databaseSQLHelper.client.prismaPlan.create(
            {
                data: {
                    id: planFree.id,
                    name: planFree.name,
                    description: planFree.description,
                    amount: planFree.amount,
                    createdAt: planFree.createdAt,
                    durationInDays: planFree.durationInDays,
                    updatedAt: planFree.updatedAt,
                    actions: {
                        connect: expenseActions.map(x => ({ id: x.id }))
                    }
                }
            }
        );

        const planGold = testPlanGoldEntity();
        await this.databaseSQLHelper.client.prismaPlan.create(
            {
                data: {
                    id: planGold.id,
                    name: planGold.name,
                    description: planGold.description,
                    amount: planGold.amount,
                    createdAt: planGold.createdAt,
                    durationInDays: planGold.durationInDays,
                    updatedAt: planGold.updatedAt,
                    actions: {
                        connect: [
                            ...expenseActions.map(x => ({ id: x.id })),
                            ...extractActions.map(x => ({ id: x.id }))
                        ]
                    }
                }
            }
        );

        const user = testUserEntityWithPlanFree();
        await this.prismaUserRepository.createUser(user);
        await this.prismaUserConsentRepository.createUserConsent(testUserConsentEntity(user.id));

        await this.prismaSubscriptionRepository.createSubscription(testSubscriptionEntityWithPlanFree(user.id));

        const customerId = await this.stripeAdapter.createCustomer(user.email);
        await this.prismaCustomerRepository.createCustomer(testCustomerEntity(user.id, customerId));

        const paymentMethodId = await this.stripeAdapter.createPaymentMethod(customerId, "pm_card_visa");
        await this.prismaPaymentMethodRepository.createPaymentMethod(testPaymentMethodEntity(user.id, paymentMethodId));
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});

        await this.databaseSQLHelper.client.prismaPlan.deleteMany({});
        await this.databaseSQLHelper.client.prismaAction.deleteMany({});

        await this.stripeAdapter.deleteAllCustomers();
    }
}