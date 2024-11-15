import {
    UserEntity,
    UserConsentEntity,
    UserVerificationCodeEntity,
    CustomerEntity,
    SubscriptionEntity,
    UserVerificationCodeTypeEnum,
    PlanEntity,
    PlanNameEnum,
    PaymentMethodEntity,
    ExpenseEntity,
    PaymentHistoryEntity,
    ExtractEntity
} from "@/layers/domain";

export const testPlanFreeEntity = (): PlanEntity => new PlanEntity(
    {
        name: PlanNameEnum.Free,
        amount: 0,
        description: "Plano FREE",
        actions: [
            {
                id: "1",
                name: "Ação 1",
                description: "Descrição da Ação 1",
                totalOperations: 1,
                createdAt: new Date("2024-01-01"),
                updatedAt: new Date("2024-06-30"),
            },
            {
                id: "2",
                name: "Ação 2",
                description: "Descrição da Ação 2",
                totalOperations: 1,
                createdAt: new Date("2024-01-15"),
                updatedAt: new Date("2024-07-01"),
            },
        ],
        durationInDays: 30
    },
    "1",
    new Date("2024-01-01")
);

export const testUserEntity = (): UserEntity => new UserEntity(
    {
        email: "email@teste.com",
        username: "Username",
        password: "Joao2003",
        verifiedEmail: true,
        updatedAt: new Date("2024-06-30"),
    }
    ,
    "1",
    new Date("2024-01-01")
);

export const testUserEntityWithEmailIsNotVerified = (): UserEntity => new UserEntity(
    {
        email: "emailnotverified@teste.com",
        username: "Username",
        password: "Joao2003",
        verifiedEmail: false,
        updatedAt: new Date("2024-06-30"),
    }
    ,
    "1",
    new Date("2024-01-01")
);

export const testUserConsentEntity = (): UserConsentEntity => new UserConsentEntity(
    {
        userId: "1",
        consentVersion: "v1.0",
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0",
    },
    "1",
    new Date("2024-01-01")
);

export const testUserVerificationCodeEntityOfTypeVerifyEmail = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.VerifyUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntityWithEmailIsNotVerified(),
        updatedAt: new Date("2024-06-30")
    },
    "1",
    new Date("2024-01-01")
);

export const testUserVerificationCodeEntityOfTypeUpdateUserEmail = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.UpdateUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity(),
        verificationCodeExpiryDate: new Date("3000-12-31"),
        updatedAt: new Date("2024-06-30"),
    },
    "1",
    new Date("2024-01-01")
);

export const testUserVerificationCodeEntityOfTypeUpdateUserEmailWithDateExpired 
    = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.UpdateUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity(),
        verificationCodeExpiryDate: new Date("2000-01-01"),
        updatedAt: new Date("2024-06-30"),
    },
    "1",
    new Date("2024-01-01")
);

export const testUserVerificationCodeEntityOfTypeRecoveryUserPassword = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.RecoveryUserPassword,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity(),
        verificationCodeExpiryDate: new Date("3000-12-31"),
        updatedAt: new Date("2024-06-30"),
    },
    "1",
    new Date("2024-01-01")
);

export const testUserVerificationCodeEntityOfTypeRecoveryUserPasswordWithDateExpired 
    = (): UserVerificationCodeEntity => new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.RecoveryUserPassword,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity(),
        verificationCodeExpiryDate: new Date("2000-01-01"),
        updatedAt: new Date("2024-06-30"),
    },
    "1",
    new Date("2024-01-01")
);

export const testSubscriptionEntity = (): SubscriptionEntity => new SubscriptionEntity(
    {
        userId: "1",
        plan: testPlanFreeEntity(),
        amount: 100,
        active: true,
        renewable: true,
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-12-31"),
        updatedAt: new Date("2024-06-30"),
    },
    "1",
    new Date("2024-01-01")
);

export const testCustomerEntity = (): CustomerEntity => new CustomerEntity(
    {
        userId: "1",
        customerId: "customer_123",
    },
    "1",
    new Date("2024-01-01")
);

export const testPaymentMethodEntity = (): PaymentMethodEntity => new PaymentMethodEntity(
    {
        name: "Payment Method",
        token: "token",
        userId: "1"
    },
    "1",
    new Date("2024-01-01")
);

export const testExpenseEntityUnpaid = (): ExpenseEntity => new ExpenseEntity(
    {
        userId: "1",
        expenseName: "Expense",
        expenseValue: 100,
        dueDate: new Date("3000-01-01"),
        paid: false
    },
    "1",
    new Date("2024-01-01")
);

export const testExpenseEntityPaid = (): ExpenseEntity => new ExpenseEntity(
    {
        userId: "1",
        expenseName: "Expense",
        expenseValue: 100,
        dueDate: new Date("3000-01-01"),
        paid: true
    },
    "2",
    new Date("2024-01-01")
);

export const testPaymentHistoryEntity = (): PaymentHistoryEntity => new PaymentHistoryEntity(
    {
        userId: "1",
        expenseId: "1",
        expenseName: "Expense",
        expenseValue: 100,
        dueDate: new Date("3000-01-01"),
        paidDate: new Date("3000-02-01")
    },
    "1",
    new Date("2024-01-01")
);

export const testExtractEntity = (): ExtractEntity => new ExtractEntity(
    {
         url: "https://example.com",
         referenceMonth: 1,
         referenceYear: 2024,
         expiryDate: new Date("3000-01-01"),
         userId: "1"
    },
    "1",
    new Date("2024-01-01")
);