import {
    CustomerEntity,
    ExpenseEntity,
    ExtractEntity,
    PaymentHistoryEntity,
    PaymentMethodEntity,
    PlanEntity,
    PlanNameEnum,
    SubscriptionEntity,
    UserEntity,
    UserVerificationCodeEntity,
    UserVerificationCodeTypeEnum
} from "@/layers/domain";

export const testUserEntity = (): UserEntity => new UserEntity(
    {
        email: "email@test.com",
        password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
        username: "Test",
        verifiedEmail: true
    },
    "00000000-0000-0000-0000-000000000000"
);

export const testUserEntityTwo = (): UserEntity => new UserEntity(
    {
        email: "email-two@test.com",
        password: "$2a$12$rCgSXPpqhjyB3m8FrCPh3eojDo6ozQ0kAc/Mb7eGgvNYNngrmJTyS", // Password1234
        username: "Test",
        verifiedEmail: true
    },
    "00000000-0000-0000-0000-000000000001"
);

export const testCustomerEntity = (): CustomerEntity => new CustomerEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        customerId: "1"
    },
    "00000000-0000-0000-0000-000000000000"
);

export const testExpenseEntityPaid = (): ExpenseEntity => new ExpenseEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        expenseName: "Expense",
        expenseValue: 100,
        dueDate: new Date("3000-01-01"),
        paid: true
    },
    "00000000-0000-0000-0000-000000000000",
    new Date("3000-01-01")
);

export const testExtractEntity = (): ExtractEntity => new ExtractEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        url: "https://url.com",
        expiryDate: new Date("3000-01-01"),
        urlExpiryDate: new Date("3000-01-01"),
        referenceMonth: 1,
        referenceYear: 2024
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testExtractEntityExpired = (): ExtractEntity => new ExtractEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        url: "https://url.com",
        expiryDate: new Date("2000-01-01"),
        urlExpiryDate: new Date("2000-01-01"),
        referenceMonth: 1,
        referenceYear: 2024
    },
    "00000000-0000-0000-0000-000000000001",
    new Date()
);

export const testPaymentHistoryEntity = (): PaymentHistoryEntity => new PaymentHistoryEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        expenseId: "00000000-0000-0000-0000-000000000000",
        dueDate: new Date("3000-01-01"),
        expenseName: "Name",
        expenseValue: 100,
        paidDate: new Date("3000-01-01")
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testPaymentMethodEntity = (): PaymentMethodEntity => new PaymentMethodEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        name: "Card One",
        token: "1"
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testPlanFreeEntity = (): PlanEntity => new PlanEntity(
    {
        name: PlanNameEnum.Free,
        amount: 0,
        description: "Plano FREE",
        actions: [
            {
                id: "00000000-0000-0000-0000-000000000000",
                name: "create:expense",
                description: "Criação de Despesa",
                createdAt: new Date("2024-01-01")
            }
        ],
        durationInDays: 0
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testSubscriptionEntity = (): SubscriptionEntity => new SubscriptionEntity(
    {
        userId: "00000000-0000-0000-0000-000000000000",
        active: true,
        renewable: true,
        startDate: new Date("2999-01-01"),
        endDate: new Date("3000-01-01"),
        updatedAt: new Date(),
        plan: testPlanFreeEntity(),
        amount: 100
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);

export const testUserVerificationCodeEntity = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        user: testUserEntity(),
        verificationCode: "000000",
        updatedAt: new Date(),
        type: UserVerificationCodeTypeEnum.VerifyUserEmail,
        valid: true,
        verificationCodeExpiryDate: new Date("3000-01-01")
    },
    "00000000-0000-0000-0000-000000000000",
    new Date()
);