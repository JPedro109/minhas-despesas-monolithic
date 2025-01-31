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
import { SubscriptionEntity } from "@/layers/domain";

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
        for (const action of [...expenseActions, ...extractActions]) {
            await this.databaseSQLHelper.client.prismaAction.create({
                data: {
                    id: action.id,
                    description: action.description,
                    name: action.name,
                    createdAt: action.createdAt,
                },
            });
        }

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

        const users = [
            {
                id: "00000000-0000-0000-0000-000000000000",
                email: "email-with-plan-gold@test.com",
                verifiedEmail: true,
                withCodeExpired: false,
                withPaymentMethodAndSubscription: true,
                withExpensesAndExtracts: false,
                withExpense: false,
                withSubscriptionInactive: true,
                deletePaymentMethod: false,
                plan: "GOLD",
                codes: ["000000", "000001", "000002"],
            },
            {
                id: "00000000-0000-0000-0000-000000000001",
                email: "email-with-plan-gold-with-codes-expired-without-payment-method@test.com",
                verifiedEmail: true,
                withCodeExpired: true,
                withPaymentMethodAndSubscription: true,
                withExpensesAndExtracts: false,
                withExpense: false,
                withSubscriptionInactive: false,
                deletePaymentMethod: true,
                plan: "GOLD",
                codes: ["000003", "000004", "000005"],
            },
            {
                id: "00000000-0000-0000-0000-000000000002",
                email: "email-with-plan-gold-and-with-email-not-verified@test.com",
                verifiedEmail: false,
                withCodeExpired: false,
                withPaymentMethodAndSubscription: false,
                withExpensesAndExtracts: false,
                withExpense: false,
                withSubscriptionInactive: false,
                deletePaymentMethod: false,
                plan: "GOLD",
                codes: ["000006", "000007", "000008"],
            },
            {
                id: "00000000-0000-0000-0000-000000000003",
                email: "email-with-plan-gold-and-with-expense@test.com",
                verifiedEmail: true,
                withCodeExpired: false,
                withPaymentMethodAndSubscription: true,
                withExpensesAndExtracts: false,
                withExpense: true,
                deletePaymentMethod: false,
                plan: "GOLD",
                codes: ["000009", "000010", "000011"],
            },
            {
                id: "00000000-0000-0000-0000-000000000004",
                email: "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
                verifiedEmail: true,
                withCodeExpired: false,
                withPaymentMethodAndSubscription: true,
                withExpensesAndExtracts: true,
                withExpenses: false,
                deletePaymentMethod: false,
                plan: "GOLD",
                codes: ["000012", "000013", "000014"],
            },
            {
                id: "00000000-0000-0000-0000-000000000005",
                email: "email-with-plan-gold-and-without-payment-method@test.com",
                verifiedEmail: true,
                withCodeExpired: false,
                withPaymentMethodAndSubscription: true,
                withExpensesAndExtracts: false,
                withExpense: false,
                withSubscriptionInactive: true,
                deletePaymentMethod: true,
                plan: "GOLD",
                codes: ["000015", "000016", "000017"],
            },
        ];

        const promises = [];
        for (const user of users) {
            promises.push(
                this.createUser(
                    user.id,
                    user.email,
                    user.verifiedEmail,
                    user.plan,
                    user.withCodeExpired,
                    user.withPaymentMethodAndSubscription,
                    user.withExpensesAndExtracts,
                    user.withExpense,
                    user.withSubscriptionInactive,
                    user.deletePaymentMethod,
                    user.codes,
                ),
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
        userId: string,
        email: string,
        verifiedEmail: boolean,
        plan: string,
        withCodeExpired: boolean,
        withPaymentMethodAndSubscription: boolean,
        withExpensesAndExtracts: boolean,
        withExpense: boolean,
        withSubscriptionInactive: boolean,
        deletePaymentMethod: boolean,
        codes: string[],
    ): Promise<void> {
        const user = verifiedEmail
            ? testUserEntity(userId, email)
            : testUserEntityWithEmailNotVerified(userId, email);
        await this.prismaUserRepository.createUser(user);
        await this.prismaUserConsentRepository.createUserConsent(
            testUserConsentEntity(user.id),
        );

        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(user, codes[0], "verify-user-email"),
        );

        const expiryDate = withCodeExpired
            ? new Date("2000-01-01")
            : new Date("3000-01-01");
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                codes[1],
                "recovery-user-password",
                expiryDate,
            ),
        );
        await this.prismaUserVerificationCodeRepository.createUserVerificationCode(
            testUserVerificationCodeEntity(
                user,
                codes[2],
                "update-user-email",
                expiryDate,
            ),
        );

        const customerId = await this.stripeAdapter.createCustomer(user.email);
        await this.prismaCustomerRepository.createCustomer(
            testCustomerEntity(user.id, customerId),
        );

        if (withPaymentMethodAndSubscription) {
            const token =
                await this.stripeAdapter.attachmentPaymentMethodInCustomer(
                    customerId,
                    "pm_card_visa",
                );
            const paymentMethod =
                await this.prismaPaymentMethodRepository.createPaymentMethod(
                    testPaymentMethodEntity(user.id, token),
                );
            const plan = testPlanGoldEntity();
            const subscriptionExternalId =
                await this.stripeAdapter.createSubscription(
                    customerId,
                    plan.planExternalId,
                    token,
                );
            await this.prismaSubscriptionRepository.createSubscription(
                new SubscriptionEntity({
                    plan,
                    subscriptionExternalId,
                    userId,
                }),
            );

            if (deletePaymentMethod) {
                await this.stripeAdapter.detachmentPaymentMethodInCustomerByToken(
                    token,
                );
                await this.prismaPaymentMethodRepository.deletePaymentMethodById(
                    paymentMethod.id,
                );
            }

            if (withSubscriptionInactive) {
                await this.stripeAdapter.updateSubscriptionRenewable(
                    subscriptionExternalId,
                    false,
                );
            }
        }

        if (withExpensesAndExtracts) {
            const extract = testExtractEntity(user.id);
            await this.prismaExtractRepository.createExtract(extract);

            const expenses = [
                { id: "00000000-0000-0000-0000-000000000000", pay: true },
                { id: "00000000-0000-0000-0000-000000000001", pay: false },
                { id: "00000000-0000-0000-0000-000000000002", pay: true },
                { id: "00000000-0000-0000-0000-000000000003", pay: true },
                { id: "00000000-0000-0000-0000-000000000004", pay: true },
                { id: "00000000-0000-0000-0000-000000000005", pay: true },
                { id: "00000000-0000-0000-0000-000000000006", pay: true },
                { id: "00000000-0000-0000-0000-000000000007", pay: true },
                { id: "00000000-0000-0000-0000-000000000008", pay: true },
                { id: "00000000-0000-0000-0000-000000000009", pay: true },
            ];

            const promises = [];
            for (const expense of expenses) {
                promises.push(
                    this.prismaExpenseRepository.createExpense(
                        expense.pay
                            ? testExpenseEntityPaid(expense.id, user.id)
                            : testExpenseEntityUnpaid(expense.id, user.id),
                    ),
                );

                if (expense.pay) {
                    promises.push(
                        this.prismaPaymentHistoryRepository.createPaymentHistory(
                            testPaymentHistoryEntity(expense.id, user.id),
                        ),
                    );
                }
            }
            await Promise.all(promises);
        }

        if (withExpense) {
            const expenseId = "00000000-0000-0000-0000-000000000010";
            await this.prismaExpenseRepository.createExpense(
                testExpenseEntityPaid(expenseId, user.id),
            );
            await this.prismaPaymentHistoryRepository.createPaymentHistory(
                testPaymentHistoryEntity(expenseId, user.id),
            );
        }
    }
}
