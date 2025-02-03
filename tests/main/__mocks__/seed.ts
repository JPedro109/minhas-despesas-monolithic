import {
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
    PrismaExpenseRepositoryAdapter,
    PrismaExtractRepositoryAdapter,
    PrismaPaymentHistoryRepositoryAdapter,
    PrismaPaymentMethodRepositoryAdapter,
    PrismaSubscriptionRepositoryAdapter,
    PrismaUserConsentRepositoryAdapter,
    PrismaUserRepositoryAdapter,
    PrismaUserVerificationCodeRepositoryAdapter,
    StripeAdapter,
} from "@/layers/external";

import {
    testUserEntity,
    testPlanGoldEntity,
    expenseActions,
    extractActions,
    testUserConsentEntity,
    testCustomerEntity,
    testPaymentMethodEntity,
    testUserVerificationCodeEntity,
    testUserEntityWithEmailNotVerified,
    testExtractEntity,
    testExpenseEntityPaid,
    testPaymentHistoryEntity,
    testExpenseEntityUnpaid,
} from "./datas";
import {
    SubscriptionEntity,
    UserEntity,
    UserVerificationCodeTypeEnum,
} from "@/layers/domain";

export class Seed {
    private readonly prismaUserRepository: PrismaUserRepositoryAdapter;
    private readonly prismaUserVerificationCodeRepository: PrismaUserVerificationCodeRepositoryAdapter;
    private readonly prismaUserConsentRepository: PrismaUserConsentRepositoryAdapter;
    private readonly prismaCustomerRepository: PrismaCustomerRepositoryAdapter;
    private readonly prismaSubscriptionRepository: PrismaSubscriptionRepositoryAdapter;
    private readonly prismaPaymentMethodRepository: PrismaPaymentMethodRepositoryAdapter;
    private readonly prismaExtractRepository: PrismaExtractRepositoryAdapter;
    private readonly prismaExpenseRepository: PrismaExpenseRepositoryAdapter;
    private readonly prismaPaymentHistoryRepository: PrismaPaymentHistoryRepositoryAdapter;

    private readonly stripeAdapter = new StripeAdapter();

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.prismaUserRepository = new PrismaUserRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaUserConsentRepository =
            new PrismaUserConsentRepositoryAdapter(this.databaseSQLHelper);
        this.prismaCustomerRepository = new PrismaCustomerRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaSubscriptionRepository =
            new PrismaSubscriptionRepositoryAdapter(this.databaseSQLHelper);
        this.prismaPaymentMethodRepository =
            new PrismaPaymentMethodRepositoryAdapter(this.databaseSQLHelper);
        this.prismaUserVerificationCodeRepository =
            new PrismaUserVerificationCodeRepositoryAdapter(
                this.databaseSQLHelper,
            );
        this.prismaExtractRepository = new PrismaExtractRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaExpenseRepository = new PrismaExpenseRepositoryAdapter(
            this.databaseSQLHelper,
        );
        this.prismaPaymentHistoryRepository =
            new PrismaPaymentHistoryRepositoryAdapter(this.databaseSQLHelper);
    }

    async populate(): Promise<void> {
        await this.createActionsAndPlans();

        const createUserOne = async (): Promise<void> => {
            const user = testUserEntityWithEmailNotVerified(
                "00000000-0000-0000-0000-000000000000",
                "email-not-verified@test.com",
            );

            await this.createUser(user);

            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.VerifyUserEmail,
                "000000",
            );

            await this.createCustomer(user);
        };

        const createUserTwo = async (): Promise<void> => {
            const user = testUserEntity(
                "00000000-0000-0000-0000-000000000001",
                "email-verified-with-valid-codes@test.com",
            );

            await this.createUser(user);

            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.UpdateUserEmail,
                "000001",
                new Date("3000-01-01"),
            );
            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.RecoveryUserPassword,
                "000002",
                new Date("3000-01-01"),
            );
            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.VerifyUserEmail,
                "000005",
            );

            await this.createCustomer(user);
        };

        const createUserThree = async (): Promise<void> => {
            const user = testUserEntity(
                "00000000-0000-0000-0000-000000000002",
                "email-verified-with-invalid-codes@test.com",
            );

            await this.createUser(user);

            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.UpdateUserEmail,
                "000003",
                new Date("2000-01-01"),
            );
            await this.createUserVerificationCode(
                user,
                UserVerificationCodeTypeEnum.RecoveryUserPassword,
                "000004",
                new Date("2000-01-01"),
            );

            await this.createCustomer(user);
        };

        const createUserFour = async (): Promise<void> => {
            const user = testUserEntity(
                "00000000-0000-0000-0000-000000000003",
                "email-payment-method-and-inactive-sub-expenses@test.com",
            );

            await this.createUser(user);
            const customerId = await this.createCustomer(user);
            await this.createPaymentMethodAndSubscription(
                user,
                customerId,
                false,
                true,
                true,
            );

            await this.createExpenses(user, [
                {
                    expenseId: "00000000-0000-0000-0000-000000000000",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000001",
                    pay: false,
                },
            ]);
        };

        const createUserFive = async (): Promise<void> => {
            const user = testUserEntity(
                "00000000-0000-0000-0000-000000000004",
                "email-verified-with-exclude-payment-method-and-sub-with-full@test.com",
            );

            await this.createUser(user);
            const customerId = await this.createCustomer(user);
            await this.createPaymentMethodAndSubscription(
                user,
                customerId,
                true,
                true,
            );

            await this.createExpenses(user, [
                {
                    expenseId: "00000000-0000-0000-0000-000000000003",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000004",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000005",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000006",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000007",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000008",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000009",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000010",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000011",
                    pay: true,
                },
                {
                    expenseId: "00000000-0000-0000-0000-000000000012",
                    pay: true,
                },
            ]);
            await this.createExtract(user);
        };

        const createUserSix = async (): Promise<void> => {
            const user = testUserEntity(
                "00000000-0000-0000-0000-000000000005",
                "email-verified-with-payment-method@test.com",
            );

            await this.createUser(user);
            const customerId = await this.createCustomer(user);
            await this.createPaymentMethodAndSubscription(user, customerId);
        };

        await Promise.all([
            createUserOne(),
            createUserTwo(),
            createUserThree(),
            createUserFour(),
            createUserFive(),
            createUserSix(),
        ]);
    }

    async truncate(): Promise<void> {
        await this.databaseSQLHelper.client.prismaUser.deleteMany({});

        await this.databaseSQLHelper.client.prismaPlan.deleteMany({});
        await this.databaseSQLHelper.client.prismaAction.deleteMany({});

        await this.stripeAdapter.deleteAllCustomers();
    }

    private async createActionsAndPlans(): Promise<void> {
        const promises = [];
        for (const action of [...expenseActions, ...extractActions]) {
            promises.push(
                this.databaseSQLHelper.client.prismaAction.create({
                    data: {
                        id: action.id,
                        description: action.description,
                        name: action.name,
                        createdAt: action.createdAt,
                    },
                }),
            );
        }
        await Promise.all(promises);

        const planGold = testPlanGoldEntity();
        await this.databaseSQLHelper.client.prismaPlan.create({
            data: {
                id: planGold.id,
                planExternalId: planGold.planExternalId,
                name: planGold.name,
                description: planGold.description,
                amount: planGold.amount,
                createdAt: planGold.createdAt,
                durationInDays: planGold.durationInDays,
                updatedAt: planGold.updatedAt,
                actions: {
                    connect: [
                        ...expenseActions.map((x) => ({ id: x.id })),
                        ...extractActions.map((x) => ({ id: x.id })),
                    ],
                },
            },
        });
    }

    private async createUser(user: UserEntity): Promise<void> {
        await this.prismaUserRepository.createUser(user);
        await this.prismaUserConsentRepository.createUserConsent(
            testUserConsentEntity(user.id),
        );
    }

    private async createUserVerificationCode(
        user: UserEntity,
        userVerificationCodeType: UserVerificationCodeTypeEnum,
        code: string,
        expiryDate?: Date,
    ): Promise<void> {
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                code,
                userVerificationCodeType,
                expiryDate,
            ),
        );
    }

    private async createCustomer(user: UserEntity): Promise<string> {
        const customerId = await this.stripeAdapter.createCustomer();
        await this.prismaCustomerRepository.createCustomer(
            testCustomerEntity(user.id, customerId),
        );
        return customerId;
    }

    private async createPaymentMethodAndSubscription(
        user: UserEntity,
        customerId: string,
        excludePaymentMethod?: boolean,
        withSubscription?: boolean,
        inactiveSubscription?: boolean,
    ): Promise<void> {
        const token =
            await this.stripeAdapter.attachmentPaymentMethodInCustomer(
                customerId,
                "pm_card_visa",
            );
        const paymentMethod =
            await this.prismaPaymentMethodRepository.createPaymentMethod(
                testPaymentMethodEntity(user.id, token),
            );

        if (withSubscription) {
            await this.createSubscription(
                user,
                customerId,
                token,
                inactiveSubscription,
            );
        }

        if (excludePaymentMethod) {
            await this.stripeAdapter.detachmentPaymentMethodInCustomerByToken(
                token,
            );
            await this.prismaPaymentMethodRepository.deletePaymentMethodById(
                paymentMethod.id,
            );
        }
    }

    private async createExpenses(
        user: UserEntity,
        expenses: {
            expenseId: string;
            pay: boolean;
        }[],
    ): Promise<void> {
        const promises = [];
        for (const expense of expenses) {
            promises.push(
                this.prismaExpenseRepository.createExpense(
                    expense.pay
                        ? testExpenseEntityPaid(expense.expenseId, user.id)
                        : testExpenseEntityUnpaid(expense.expenseId, user.id),
                ),
            );

            if (expense.pay) {
                promises.push(
                    this.prismaPaymentHistoryRepository.createPaymentHistory(
                        testPaymentHistoryEntity(expense.expenseId, user.id),
                    ),
                );
            }
        }

        await Promise.all(promises);
    }

    private async createExtract(user: UserEntity): Promise<void> {
        const extract = testExtractEntity(user.id);
        await this.prismaExtractRepository.createExtract(extract);
    }

    private async createSubscription(
        user: UserEntity,
        customerId: string,
        paymentMethodToken: string,
        inactiveSubscription?: boolean,
    ): Promise<void> {
        const plan = testPlanGoldEntity();
        const subscriptionExternalId =
            await this.stripeAdapter.createSubscription(
                customerId,
                plan.planExternalId,
                paymentMethodToken,
            );
        await this.prismaSubscriptionRepository.createSubscription(
            new SubscriptionEntity({
                plan,
                subscriptionExternalId,
                userId: user.id,
            }),
        );

        if (inactiveSubscription) {
            await this.stripeAdapter.updateSubscriptionRenewable(
                subscriptionExternalId,
                false,
            );
        }
    }
}
