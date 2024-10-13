import { 
    UserEntity, 
    UserConsentEntity, 
    UserVerificationCodeEntity, 
    CustomerEntity, 
    SubscriptionEntity, 
    UserVerificationCodeTypeEnum,
    PlanEntity,
    PlanNameEnum
} from "@/layers/domain";

export const testPlanEntity = new PlanEntity(
    {
        name: PlanNameEnum.Free, 
        amount: 50,
        description: "Plano GOLD com benefícios exclusivos",
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
        ]
    }, 
    "1", 
    new Date("2024-01-01")
);

export const testUserEntity = new UserEntity(
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

export const testUserEntityWithEmailIsNotVerified = new UserEntity(
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

export const testUserConsentEntity = new UserConsentEntity(
    {
        userId: "1",
        consentVersion: "v1.0",
        consentDate: new Date("2024-06-30"),
        ipAddress: "192.168.1.1",
        userAgent: "Mozilla/5.0",
    }, 
    "1", 
    new Date("2024-01-01")
);

export const testSubscriptionEntity = new SubscriptionEntity(
    {
        userId: "1",
        planId: "1",
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

export const verifyEmailTestUserVerificationCodeEntityWhoseUserEmailIsNotVerified = new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.VerifyUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntityWithEmailIsNotVerified,
        updatedAt: new Date("2024-06-30")
    }, 
    "1", 
    new Date("2024-01-01")
);

export const updateUserEmailTestUserVerificationCodeEntity = new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.UpdateUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity,
        verificationCodeExpiryDate: new Date("3000-12-31"),
        updatedAt: new Date("2024-06-30"),
    }, 
    "1", 
    new Date("2024-01-01")
);

export const updateUserEmailTestUserVerificationCodeEntityWithDateExpired = new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.UpdateUserEmail,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity,
        verificationCodeExpiryDate: new Date("2000-01-01"),
        updatedAt: new Date("2024-06-30"),
    }, 
    "1", 
    new Date("2024-01-01")
);

export const recoveryUserPasswordTestUserVerificationCodeEntity = new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.RecoveryUserPassword,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity,
        verificationCodeExpiryDate: new Date("3000-12-31"),
        updatedAt: new Date("2024-06-30"),
    }, 
    "1", 
    new Date("2024-01-01")
);

export const recoveryUserPasswordTestUserVerificationCodeEntityWithDateExpired = new UserVerificationCodeEntity(
    {
        type: UserVerificationCodeTypeEnum.RecoveryUserPassword,
        verificationCode: "123456",
        valid: true,
        user: testUserEntity,
        verificationCodeExpiryDate: new Date("2000-01-01"),
        updatedAt: new Date("2024-06-30"),
    }, 
    "1", 
    new Date("2024-01-01")
);

export const testCustomerEntity = new CustomerEntity(
    {
        userId: "1",
        customerId: "customer_123",
    }, 
    "1", 
    new Date("2024-01-01")
);