/* eslint-disable @typescript-eslint/no-unused-vars */

import {
    ExpenseExtractProps,
    ISecurity,
    IBucket,
    ICryptography,
    ICustomerRepository,
    IExpenseRepository,
    IExtract,
    IExtractRepository,
    IGeneration,
    INotification,
    IPayment,
    IPaymentHistoryRepository,
    IPaymentMethodRepository,
    IPlanRepository,
    ISubscriptionRepository,
    IUnitOfWorkRepository,
    IUserConsentRepository,
    IUserRepository,
    IUserVerificationCodeRepository,
    JsonWebTokenType,
    MailBodyTypeEnum,
} from "@/layers/application";
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
} from "@/layers/domain";
import {
    testCustomerEntity,
    testExpenseEntityPaid,
    testExpenseEntityUnpaid,
    testExtractEntity,
    testPaymentHistoryEntity,
    testPaymentMethodEntity,
    testPlanFreeEntity,
    testSubscriptionEntityWithPlanFree,
    testSubscriptionEntityWithPlanGold,
    testUserEntity,
} from "./datas";

export class BucketStub implements IBucket {
    async uploadFile(fileName: string, fileContent: Buffer): Promise<string> {
        return "https://www.example.com";
    }
}

export class ExtractStub implements IExtract {
    async generateExpensesExtract(props: ExpenseExtractProps): Promise<Buffer> {
        return Buffer.from("Mocked PDF content for expenses extract", "utf-8");
    }
}

export class SecurityStub implements ISecurity {
    createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
        return "token";
    }

    verifyJsonWebToken(token: string): JsonWebTokenType {
        return {
            id: "1",
            email: "email@test.com",
            type: "access_token",
        };
    }

    verifyBasicAuthenticationCredential(credential: string): boolean {
        return true;
    }
}

export class CryptographyStub implements ICryptography {
    async toHash(value: string): Promise<string> {
        return "$2b$12$qx/jS7nYYxrDqjgah9w4eOnr3fRR6roW5UWGYLuiQr81s0wwc1Yl6";
    }

    async compareHash(
        hash: string,
        valueToBeCompared: string,
    ): Promise<boolean> {
        return true;
    }
}

export class GenerationStub implements IGeneration {
    generateCode(): string {
        return "123456";
    }

    generateCodeExpirationDate(): Date {
        return new Date();
    }
}

export class NotificationStub implements INotification {
    async sendMail(
        to: string,
        type: MailBodyTypeEnum,
        props?: object,
    ): Promise<void> {}
}

export class PaymentStub implements IPayment {
    async createCustomer(email: string): Promise<string> {
        return "1";
    }

    async updateCustomerEmailByCustomerId(
        customerId: string,
        email: string,
    ): Promise<void> {}

    async deleteCustomer(customerId: string): Promise<void> {}

    async attachmentPaymentMethodInCustomer(
        customerId: string,
        paymentMethodId: string,
    ): Promise<string> {
        return "1";
    }

    async deletePaymentMethodByToken(paymentMethodId: string): Promise<void> {}
}

export class CustomerRepositoryStub implements ICustomerRepository {
    setContext(context: unknown): void {}

    async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
        return customer;
    }

    async getCustomerByUserId(userId: string): Promise<CustomerEntity | null> {
        return testCustomerEntity();
    }

    async getCustomersByUserIds(userIds: string[]): Promise<CustomerEntity[]> {
        return [testCustomerEntity()];
    }
}

export class PlanRepositoryStub implements IPlanRepository {
    setContext(context: unknown): void {}

    async getPlans(): Promise<PlanEntity[]> {
        return [testPlanFreeEntity()];
    }

    async getPlanByName(planName: PlanNameEnum): Promise<PlanEntity | null> {
        return testPlanFreeEntity();
    }

    async getPlanById(planId: string): Promise<PlanEntity | null> {
        return testPlanFreeEntity();
    }
}

export class SubscriptionRepositoryStub implements ISubscriptionRepository {
    setContext(context: unknown): void {}

    async createSubscription(
        subscription: SubscriptionEntity,
    ): Promise<SubscriptionEntity> {
        return subscription;
    }

    async updateSubscriptionById(
        subscriptionId: string,
        subscription: SubscriptionEntity,
    ): Promise<void> {}

    async getActiveSubscriptionByUserId(
        userId: string,
    ): Promise<SubscriptionEntity | null> {
        return testSubscriptionEntityWithPlanFree();
    }

    async getActiveSubscriptionsByEndDate(
        endDate: Date,
        renewable: boolean,
    ): Promise<SubscriptionEntity[]> {
        return [testSubscriptionEntityWithPlanFree()];
    }

    async getSubscriptionsActiveAndRenewableWhenTheCurrentDateIsGreaterThanTheEndDate(): Promise<
        SubscriptionEntity[]
    > {
        return [testSubscriptionEntityWithPlanGold()];
    }
}

export class UserConsentRepositoryStub implements IUserConsentRepository {
    setContext(context: unknown): void {}

    async createUserConsent(
        userConsent: UserConsentEntity,
    ): Promise<UserConsentEntity> {
        return userConsent;
    }
}

export class UserRepositoryStub implements IUserRepository {
    setContext(context: unknown): void {}

    async createUser(user: UserEntity): Promise<UserEntity> {
        return user;
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return testUserEntity();
    }

    async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
        return [testUserEntity()];
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return testUserEntity();
    }

    async updateUserById(id: string, user: UserEntity): Promise<void> {}

    async deleteUserById(id: string): Promise<void> {}
}

export class UserVerificationCodeRepositoryStub
    implements IUserVerificationCodeRepository
{
    setContext(context: unknown): void {}

    async createUserVerificationCode(
        userVerificationCode: UserVerificationCodeEntity,
    ): Promise<UserVerificationCodeEntity> {
        return userVerificationCode;
    }

    async getUserVerificationCodeByVerificationCode(
        verificationCode: string,
    ): Promise<UserVerificationCodeEntity | null> {
        return null;
    }

    async updateUserVerificationCodeById(
        userVerificationCodeId: string,
        userVerificationCode: UserVerificationCodeEntity,
    ): Promise<void> {}
}

export class PaymentMethodRepositoryStub implements IPaymentMethodRepository {
    setContext(context: unknown): void {}

    async createPaymentMethod(
        paymentMethod: PaymentMethodEntity,
    ): Promise<PaymentMethodEntity> {
        return testPaymentMethodEntity();
    }

    async getPaymentMethodByUserId(
        userId: string,
    ): Promise<PaymentMethodEntity | null> {
        return testPaymentMethodEntity();
    }

    async getPaymentMethodsByUserIds(
        userIds: string[],
    ): Promise<PaymentMethodEntity[]> {
        return [testPaymentMethodEntity()];
    }

    async getPaymentMethodById(
        id: string,
    ): Promise<PaymentMethodEntity | null> {
        return testPaymentMethodEntity();
    }

    async updatePaymentMethodById(
        paymentMethodId: string,
        paymentMethod: PaymentMethodEntity,
    ): Promise<void> {}

    async deletePaymentMethodById(paymentMethodId: string): Promise<void> {}
}

export class ExpenseRepositoryStub implements IExpenseRepository {
    setContext(context: unknown): void {}

    async createExpense(expenseEntity: ExpenseEntity): Promise<ExpenseEntity> {
        return testExpenseEntityUnpaid();
    }

    async getExpenseById(id: string): Promise<ExpenseEntity | null> {
        return testExpenseEntityUnpaid();
    }

    async getExpensesByUserId(userId: string): Promise<ExpenseEntity[]> {
        return [testExpenseEntityUnpaid()];
    }

    async getExpensesByDueDate(dueDate: Date): Promise<ExpenseEntity[]> {
        return [testExpenseEntityUnpaid(), testExpenseEntityPaid()];
    }

    async updateExpenseById(id: string, data: ExpenseEntity): Promise<void> {}

    async updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth(
        month: number,
    ): Promise<void> {}

    async deleteExpenseById(id: string): Promise<void> {}

    async deleteExpensesByUserId(userId: string): Promise<void> {}
}

export class PaymentHistoryRepositoryStub implements IPaymentHistoryRepository {
    setContext(context: unknown): void {}

    async createPaymentHistory(
        paymentHistory: PaymentHistoryEntity,
    ): Promise<PaymentHistoryEntity> {
        return testPaymentHistoryEntity();
    }

    async getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
        userId: string,
        paymentMonth: number,
        paymentYear: number,
    ): Promise<PaymentHistoryEntity[]> {
        return [testPaymentHistoryEntity()];
    }

    async deletePaymentHistoriesByExpenseId(expenseId: string): Promise<void> {}

    async deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear(
        expenseId: string,
        paymentMonth: number,
        paymentYear: number,
    ): Promise<void> {}
}

export class ExtractRepositoryStub implements IExtractRepository {
    setContext(context: unknown): void {}

    async createExtract(extract: ExtractEntity): Promise<ExtractEntity> {
        return testExtractEntity();
    }

    async getExtractById(id: string): Promise<ExtractEntity> {
        return testExtractEntity();
    }

    async getExtractsByUserId(userId: string): Promise<ExtractEntity[]> {
        return [testExtractEntity()];
    }

    async deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate(): Promise<void> {}
}

export class UnitOfWorkRepositoryStub implements IUnitOfWorkRepository {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly userVerificationCodeRepository: IUserVerificationCodeRepository,
        private readonly customerRepository: ICustomerRepository,
        private readonly planRepository: IPlanRepository,
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly userConsentRepository: IUserConsentRepository,
        private readonly paymentMethodRepository: IPaymentMethodRepository,
        private readonly expenseRepository: IExpenseRepository,
        private readonly paymentHistory: IPaymentHistoryRepository,
        private readonly extractRepository: IExtractRepository,
    ) {}

    async transaction(querys: () => Promise<void>): Promise<void> {
        await querys();
    }

    getUserRepository(): IUserRepository {
        return this.userRepository;
    }

    getUserConsentRepository(): IUserConsentRepository {
        return this.userConsentRepository;
    }

    getUserVerificationCodeRepository(): IUserVerificationCodeRepository {
        return this.userVerificationCodeRepository;
    }

    getCustomerRepository(): ICustomerRepository {
        return this.customerRepository;
    }

    getPlanRepository(): IPlanRepository {
        return this.planRepository;
    }

    getSubscriptionRepository(): ISubscriptionRepository {
        return this.subscriptionRepository;
    }

    getPaymentMethodRepository(): IPaymentMethodRepository {
        return this.paymentMethodRepository;
    }

    getExpenseRepository(): IExpenseRepository {
        return this.expenseRepository;
    }

    getPaymentHistoryRepository(): IPaymentHistoryRepository {
        return this.paymentHistory;
    }

    getExtractRepository(): IExtractRepository {
        return this.extractRepository;
    }
}

export const bucketStubFactory = (): BucketStub => new BucketStub();
export const extractStubFactory = (): ExtractStub => new ExtractStub();
export const securityStubFactory = (): SecurityStub => new SecurityStub();
export const cryptographyStubFactory = (): CryptographyStub =>
    new CryptographyStub();
export const generationStubFactory = (): GenerationStub => new GenerationStub();
export const notificationStubFactory = (): NotificationStub =>
    new NotificationStub();
export const paymentStubFactory = (): PaymentStub => new PaymentStub();
export const userRepositoryStubFactory = (): UserRepositoryStub =>
    new UserRepositoryStub();
export const userConsentRepositoryStubFactory = (): UserConsentRepositoryStub =>
    new UserConsentRepositoryStub();
export const userVerificationCodeRepositoryStubFactory =
    (): UserVerificationCodeRepositoryStub =>
        new UserVerificationCodeRepositoryStub();
export const customerRepositoryStubFactory = (): CustomerRepositoryStub =>
    new CustomerRepositoryStub();
export const planRepositoryStubFactory = (): PlanRepositoryStub =>
    new PlanRepositoryStub();
export const subscriptionRepositoryStubFactory =
    (): SubscriptionRepositoryStub => new SubscriptionRepositoryStub();
export const paymentMethodRepositoryStubFactory =
    (): PaymentMethodRepositoryStub => new PaymentMethodRepositoryStub();
export const expenseRepositoryStubFactory = (): ExpenseRepositoryStub =>
    new ExpenseRepositoryStub();
export const paymentHistoryRepositoryStubFactory =
    (): PaymentHistoryRepositoryStub => new PaymentHistoryRepositoryStub();
export const extractRepositoryStubFactory = (): ExtractRepositoryStub =>
    new ExtractRepositoryStub();
export const unitOfWorkRepositoryStubFactory = (): UnitOfWorkRepositoryStub =>
    new UnitOfWorkRepositoryStub(
        userRepositoryStubFactory(),
        userVerificationCodeRepositoryStubFactory(),
        customerRepositoryStubFactory(),
        planRepositoryStubFactory(),
        subscriptionRepositoryStubFactory(),
        userConsentRepositoryStubFactory(),
        paymentMethodRepositoryStubFactory(),
        expenseRepositoryStubFactory(),
        paymentHistoryRepositoryStubFactory(),
        extractRepositoryStubFactory(),
    );
