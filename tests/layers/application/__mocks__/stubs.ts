/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
    IAuthentication,
    ICryptography, 
    ICustomerRepository, 
    IExpenseRepository, 
    IExtract, 
    IExtractRepository, 
    IGeneration, 
    IMail, 
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
    PaymentCurrencyEnum 
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
    UserVerificationCodeEntity 
} from "@/layers/domain";
import { 
    testCustomerEntity, 
    testExpenseEntityPaid, 
    testExpenseEntityUnpaid, 
    testExtractEntity, 
    testPaymentHistory, 
    testPaymentMethodEntity, 
    testPlanEntity, 
    testSubscriptionEntity, 
    testUserEntity 
} from "./datas";

export class ExtractStub implements IExtract {

    async generateExtract<T>(props: T): Promise<void> { }
}

export class AuthenticationStub implements IAuthentication {
	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		return "token";
	}

	verifyJsonWebToken(token: string): JsonWebTokenType {
		return {
			id: "1",
			email: "email@test.com",
            type: "access_token"
		};
	}
}

export class CryptographyStub implements ICryptography {
    async toHash(value: string): Promise<string> {
        return "$2b$12$qx/jS7nYYxrDqjgah9w4eOnr3fRR6roW5UWGYLuiQr81s0wwc1Yl6";
    }

    async compareHash(hash: string, valueToBeCompared: string): Promise<boolean> {
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

export class MailStub implements IMail {
    async sendMail(to: string, type: MailBodyTypeEnum, props?: object): Promise<void> { }
}

export class PaymentStub implements IPayment {
    async createCustomer(email: string): Promise<string> {
        return "1";
    }

    async updateCustomerEmailByCustomerId(customerId: string, email: string): Promise<void> { }

    async deleteCustomer(customerId: string): Promise<void> { }

    async createPaymentMethod(customerId: string, paymentMethodId: string): Promise<void> { }

    async deletePaymentMethod(paymentMethodId: string): Promise<void> { }

    async pay(
        customerId: string, 
        paymentMethodId: string, 
        amount: number, 
        currency: PaymentCurrencyEnum
    ): Promise<void> { }
}

export class CustomerRepositoryStub implements ICustomerRepository {
    setContext(context: unknown): void { }

    async createCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
        return customer;
    }

    async getCustomerByUserId(userId: string): Promise<CustomerEntity | null> {
        return testCustomerEntity;
    }

    async getCustomersByUserIds(userIds: string[]): Promise<CustomerEntity[]> {
        return [testCustomerEntity];
    }
}

export class PlanRepositoryStub implements IPlanRepository {
    setContext(context: unknown): void { }

    async getPlans(): Promise<PlanEntity[]> {
        return [testPlanEntity];
    }

    async getPlanByName(planName: PlanNameEnum): Promise<PlanEntity | null> {
        return testPlanEntity;
    }

    async getPlanById(planId: string): Promise<PlanEntity | null> {
        return testPlanEntity;
    }
}

export class SubscriptionRepositoryStub implements ISubscriptionRepository {
    setContext(context: unknown): void { }

    async createSubscription(subscription: SubscriptionEntity): Promise<SubscriptionEntity> {
        return subscription;
    }

    async updateSubscriptionById(subscriptionId: string, subscription: SubscriptionEntity): Promise<SubscriptionEntity> {
        return testSubscriptionEntity();
    }

    async getActiveSubscriptionByUserId(userId: string): Promise<SubscriptionEntity | null> {
        return testSubscriptionEntity();
    }

    async getActiveSubscriptionsByEndDate(endDate: Date, renewable: boolean): Promise<SubscriptionEntity[]> {
        return [testSubscriptionEntity()];
    }
}

export class UserConsentRepositoryStub implements IUserConsentRepository {
    setContext(context: unknown): void { }

    async createUserConsent(userConsent: UserConsentEntity): Promise<UserConsentEntity> {
        return userConsent;
    }
}

export class UserRepositoryStub implements IUserRepository {
    setContext(context: unknown): void { }

    async createUser(user: UserEntity): Promise<UserEntity> {
        return user;
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return testUserEntity;
    }

    async getUsersByIds(ids: string[]): Promise<UserEntity[]> {
        return [testUserEntity];
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return testUserEntity;
    }

    async updateUserById(id: string, user: UserEntity): Promise<UserEntity> {
        return user;
    }

    async deleteUserById(id: string): Promise<UserEntity> {
        return testUserEntity;
    }
}

export class UserVerificationCodeRepositoryStub implements IUserVerificationCodeRepository {
    setContext(context: unknown): void { }

    async createUserVerificationCode(userVerificationCode: UserVerificationCodeEntity): Promise<UserVerificationCodeEntity> {
        return userVerificationCode;
    }

    async updateUserVerificationCode(userVerificationCode: UserVerificationCodeEntity): Promise<UserVerificationCodeEntity> {
        return userVerificationCode;
    }

    async getUserVerificationCodeByVerificationCode(verificationCode: string): Promise<UserVerificationCodeEntity | null> {
        return null;
    }
    
    async updateUserVerificationCodeById(
        userVerificationCodeId : string, 
        userVerificationCode: UserVerificationCodeEntity
    ): Promise<UserVerificationCodeEntity> {
        return null;
    };
}

export class PaymentMethodRepositoryStub implements IPaymentMethodRepository {
    setContext(context: unknown): void { }

    async createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity> {
        return testPaymentMethodEntity;
    }

    async getPaymentMethodByUserId(userId: string): Promise<PaymentMethodEntity | null> {
        return testPaymentMethodEntity;
    }

    async getPaymentMethodsByUserIds(userIds: string[]): Promise<PaymentMethodEntity[]> {
        return [testPaymentMethodEntity];
    }

    async getPaymentMethodById(id: string): Promise<PaymentMethodEntity | null> {
        return testPaymentMethodEntity;
    }

    async updatePaymentMethodById(paymentMethodId: string, paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity> {
        return testPaymentMethodEntity;
    }

    async deletePaymentMethodById(paymentMethodId: string): Promise<PaymentMethodEntity> {
        return testPaymentMethodEntity;
    }
}

export class ExpenseRepositoryStub implements IExpenseRepository {

    setContext(context: unknown): void { }

    async createExpense(expenseEntity: ExpenseEntity): Promise<ExpenseEntity> {
        return testExpenseEntityUnpaid;
    }

    async getExpenseById(id: string): Promise<ExpenseEntity | null> {
        return testExpenseEntityUnpaid;
    }

    async getExpensesByUserId(userId: string): Promise<ExpenseEntity[]> {
        return [testExpenseEntityUnpaid];
    }

    async getExpensesByDueDate(dueDate: Date): Promise<ExpenseEntity[]> {
        return [testExpenseEntityUnpaid, testExpenseEntityPaid];
    }

    async updateExpenseById(id: string, data: ExpenseEntity): Promise<ExpenseEntity> {
        return testExpenseEntityUnpaid;
    }

    async updatePaidExpensesToUnpaidAndSumOneInDueDateMonthByDueDateMonth(month: number): Promise<void> { }

    async deleteExpenseById(id: string): Promise<ExpenseEntity> {
        return testExpenseEntityUnpaid;
    }
}

export class PaymentHistoryRepositoryStub implements IPaymentHistoryRepository {

    async createPaymentHistory(paymentHistory: PaymentHistoryEntity): Promise<PaymentHistoryEntity> {
        return testPaymentHistory;
    }

    async getPaymentHistoriesByUserIdAndPaymentMonthAndPaymentYear(
        userId: string, 
        paymentMonth: number, 
        paymentYear: number
    ): Promise<PaymentHistoryEntity[]> {
        return [testPaymentHistory];
    }

    async deletePaymentHistoriesByExpenseId(expenseId: string): Promise<void> { }

    async deletePaymentHistoryByExpenseIdAndPaymentMonthAndPaymentYear(
        expenseId: string, 
        paymentMonth: number, 
        paymentYear: number
    ): Promise<PaymentHistoryEntity> {
        return testPaymentHistory;
    }

}

export class ExtractRepositoryStub implements IExtractRepository {

    async createExtract(extract: ExtractEntity): Promise<ExtractEntity> {
        return testExtractEntity;
    }

    async updateExtract(extract: ExtractEntity): Promise<ExtractEntity> {
        return testExtractEntity;
    }

    async getExtractById(id: string): Promise<ExtractEntity> {
        return testExtractEntity;
    }

    async getExtractsByUserId(userId: string): Promise<ExtractEntity[]> {
        return [testExtractEntity];
    }

    async deleteExtractsWhenTheCurrentDateIsGreaterThanTheExpirationDate(): Promise<void> { }

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
        private readonly extractRepository: IExtractRepository
    ) { }

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

export const extractStub = new ExtractStub();
export const authenticationStub = new AuthenticationStub();
export const cryptographyStub = new CryptographyStub();
export const generationStub = new GenerationStub();
export const mailStub = new MailStub();
export const paymentStub = new PaymentStub();
export const userRepositoryStub = new UserRepositoryStub();
export const userConsentRepositoryStub = new UserConsentRepositoryStub();
export const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
export const customerRepositoryStub = new CustomerRepositoryStub();
export const planRepositoryStub = new PlanRepositoryStub();
export const subscriptionRepositoryStub = new SubscriptionRepositoryStub();
export const paymentMethodRepositoryStub = new PaymentMethodRepositoryStub();
export const expenseRepositoryStub = new ExpenseRepositoryStub();
export const paymentHistoryRepositoryStub = new PaymentHistoryRepositoryStub(); 
export const extractRepositoryStub = new ExtractRepositoryStub();
export const unitOfWorkRepositoryStub = new UnitOfWorkRepositoryStub(
    userRepositoryStub,
    userVerificationCodeRepositoryStub,
    customerRepositoryStub,
    planRepositoryStub,
    subscriptionRepositoryStub,
    userConsentRepositoryStub,
    paymentMethodRepositoryStub,
    expenseRepositoryStub,
    paymentHistoryRepositoryStub,
    extractRepositoryStub
);