import {
    CustomerEntity,
    ExpenseEntity,
    ExtractEntity,
    PaymentHistoryEntity,
    PaymentMethodEntity,
    PlanEntity,
    PlanNameEnum,
    SubscriptionEntity,
    UserConsentEntity,
    UserEntity,
    UserVerificationCodeEntity,
    UserVerificationCodeTypeEnum,
} from "@/layers/domain";

export const expenseActions = [
    {
        id: "00000000-0000-0000-0000-000000000000",
        name: "create:expense",
        description: "Criação de Despesa",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000001",
        name: "get:expense",
        description: "Retorno de Despesa",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000002",
        name: "update:expense",
        description: "Atualização de Despesa",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000003",
        name: "delete:expense",
        description: "Deleção de Despesa",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000004",
        name: "pay:expense",
        description: "Pagamento de Despesa",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000005",
        name: "undo-payment:expense",
        description: "Desfazimento de Pagamento de Despesa",
        createdAt: new Date("2024-01-01"),
    },
];

export const extractActions = [
    {
        id: "00000000-0000-0000-0000-000000000006",
        name: "create:extract",
        description: "Criação de Extrato",
        createdAt: new Date("2024-01-01"),
    },
    {
        id: "00000000-0000-0000-0000-000000000007",
        name: "get:extract",
        description: "Retorno de Extrato",
        createdAt: new Date("2024-01-01"),
    },
];

export const testPlanGoldEntity = (): PlanEntity =>
    new PlanEntity(
        {
            name: PlanNameEnum.Gold,
            planExternalId: "price_1QkaxzRu300ehj2uYbE4FbTP",
            amount: 200,
            description: "Plano GOLD",
            actions: [...expenseActions, ...extractActions],
            durationInDays: 30,
        },
        "00000000-0000-0000-0000-000000000001",
    );

export const testUserConsentEntity = (userId: string): UserConsentEntity =>
    new UserConsentEntity({
        userId,
        consentVersion: "v1.0",
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0",
    });

export const testCustomerEntity = (
    userId: string,
    customerId: string,
): CustomerEntity =>
    new CustomerEntity({
        userId,
        customerId,
    });

export const testPaymentMethodEntity = (
    userId: string,
    token: string,
): PaymentMethodEntity =>
    new PaymentMethodEntity(
        {
            userId: userId,
            name: "Card One",
            token,
        },
        userId,
    );

export const testUserEntity = (id: string, email: string): UserEntity =>
    new UserEntity(
        {
            email,
            password:
                "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
            username: "Test",
            verifiedEmail: true,
        },
        id,
    );

export const testUserEntityWithEmailNotVerified = (
    id: string,
    email: string,
): UserEntity =>
    new UserEntity(
        {
            email,
            password:
                "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
            username: "Test",
            verifiedEmail: false,
        },
        id,
    );

export const testUserVerificationCodeEntity = (
    user: UserEntity,
    code: string,
    type: UserVerificationCodeTypeEnum,
    verificationCodeExpiryDate?: Date,
): UserVerificationCodeEntity => {
    return new UserVerificationCodeEntity({
        type,
        user,
        valid: true,
        verificationCode: code,
        verificationCodeExpiryDate,
    });
};

export const testSubscriptionEntityWithPlanGold = (
    userId: string,
): SubscriptionEntity =>
    new SubscriptionEntity({
        userId,
        subscriptionExternalId: "1",
        plan: testPlanGoldEntity(),
    });

export const testExpenseEntityPaid = (
    id: string,
    userId: string,
): ExpenseEntity =>
    new ExpenseEntity(
        {
            userId,
            expenseName: "Expense",
            expenseValue: 100,
            dueDate: new Date("3000-01-01"),
            paid: true,
        },
        id,
    );

export const testExpenseEntityUnpaid = (
    id: string,
    userId: string,
): ExpenseEntity =>
    new ExpenseEntity(
        {
            userId,
            expenseName: "Expense",
            expenseValue: 100,
            dueDate: new Date("3000-01-01"),
            paid: false,
        },
        id,
    );

export const testPaymentHistoryEntity = (
    expenseId: string,
    userId: string,
): PaymentHistoryEntity =>
    new PaymentHistoryEntity(
        {
            userId,
            expenseId,
            expenseName: "Expense",
            expenseValue: 100,
            dueDate: new Date("3000-01-01"),
            paidDate: new Date("3000-01-01"),
        },
        expenseId,
    );

export const testExtractEntity = (userId: string): ExtractEntity =>
    new ExtractEntity(
        {
            url: "https://example.com",
            referenceMonth: 1,
            referenceYear: 2024,
            expiryDate: new Date("3000-01-01"),
            urlExpiryDate: new Date("3000-01-01"),
            userId,
        },
        userId,
    );
