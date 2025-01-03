import {
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
    PrismaPaymentMethodRepositoryAdapter,
    PrismaSubscriptionRepositoryAdapter,
    PrismaUserConsentRepositoryAdapter,
    PrismaUserRepositoryAdapter,
    PrismaUserVerificationCodeRepositoryAdapter,
    StripeAdapter
} from "@/layers/external";

import {
    testPlanFreeEntity,
    testUserEntity,
    testPlanGoldEntity,
    expenseActions,
    extractActions,
    testUserConsentEntity,
    testCustomerEntity,
    testSubscriptionEntityWithPlanFree,
    testPaymentMethodEntity,
    testSubscriptionEntityWithPlanGold,
    testUserVerificationCodeEntity,
    testUserEntityWithEmailNotVerified
} from "./datas";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaUserVerificationCodeRepository: PrismaUserVerificationCodeRepositoryAdapter;
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
        this.prismaUserVerificationCodeRepository = new PrismaUserVerificationCodeRepositoryAdapter(this.databaseSQLHelper);
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

        const users = [
            {
                email: "email-with-plan-free@test.com",
                verifiedEmail: true,
                withCodeExpired: false,
                withPaymentMethod: true,
                plan: "FREE",
                codes: [
                    "000000",
                    "000001",
                    "000002"
                ]
            },
            {
                email: "email-with-plan-free-with-codes-expired-without-payment-method@test.com",
                verifiedEmail: true,
                withCodeExpired: true,
                withPaymentMethod: false,
                plan: "FREE",
                codes: [
                    "000003",
                    "000004",
                    "000005"
                ]
            },
            {
                email: "email-with-plan-free-and-with-email-not-verified@test.com",
                verifiedEmail: false,
                withCodeExpired: false,
                withPaymentMethod: false,
                plan: "FREE",
                codes: [
                    "000006",
                    "000007",
                    "000008"
                ]
            }
        ];

        const promises = [];
        for (const user of users) {
            promises.push(
                this.createUser(user.email, user.verifiedEmail, user.plan, user.withCodeExpired, user.withPaymentMethod, user.codes)
            );
        }
        await Promise.all(promises);
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});

        await this.databaseSQLHelper.client.prismaPlan.deleteMany({});
        await this.databaseSQLHelper.client.prismaAction.deleteMany({});

        await this.stripeAdapter.deleteAllCustomers();
    }

    private async createUser(
        email: string, 
        verifiedEmail: boolean,
        plan: string, 
        withCodeExpired: boolean,
        withPaymentMethod: boolean,
        codes: string[]
    ): Promise<void> {
        const user = verifiedEmail ? testUserEntity(email) : testUserEntityWithEmailNotVerified(email);
        await this.prismaUserRepository.createUser(user);
        await this.prismaUserConsentRepository.createUserConsent(testUserConsentEntity(user.id));

        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                codes[0],
                "verify-user-email"
            )
        );

        const expiryDate = withCodeExpired ? new Date("2000-01-01") : new Date("3000-01-01");
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                codes[1],
                "recovery-user-password",
                expiryDate
            )
        );
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                codes[2],
                "update-user-email",
                expiryDate
            )
        );

        const subscription = plan === "FREE" ? testSubscriptionEntityWithPlanFree(user.id) : testSubscriptionEntityWithPlanGold(user.id);
        await this.prismaSubscriptionRepository.createSubscription(subscription);

        const customerId = await this.stripeAdapter.createCustomer(user.email);
        await this.prismaCustomerRepository.createCustomer(testCustomerEntity(user.id, customerId));

        if(withPaymentMethod) {
            const paymentMethodId = await this.stripeAdapter.createPaymentMethod(customerId, "pm_card_visa");
            await this.prismaPaymentMethodRepository.createPaymentMethod(testPaymentMethodEntity(user.id, paymentMethodId));
        }
    }
}