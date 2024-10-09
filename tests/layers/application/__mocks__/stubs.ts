/* eslint-disable @typescript-eslint/no-unused-vars */

import { 
    ICryptography, 
    ICustomerRepository, 
    IGeneration, 
    IMail, 
    IPayment, 
    IPlanRepository, 
    ISubscriptionRepository, 
    IUnitOfWorkRepository, 
    IUserConsentRepository, 
    IUserRepository, 
    IUserVerificationCodeRepository, 
    MailBodyTypeEnum, 
    PaymentCurrencyEnum 
} from "@/layers/application";
import { 
    CustomerEntity, 
    PlanEntity, 
    PlanNameEnum, 
    SubscriptionEntity, 
    UserConsentEntity, 
    UserEntity, 
    UserVerificationCodeEntity 
} from "@/layers/domain";
import { testCustomerEntity, testPlanEntity, testSubscriptionEntity, testUserEntity } from "./datas";

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

    async updateCustomer(customerId: string, email: string): Promise<void> { }

    async deleteCustomer(customerId: string): Promise<void> {
       
    }

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

    async getCustomerByUserId(userId: string): Promise<CustomerEntity> {
        return testCustomerEntity;
    }
}

export class PlanRepositoryStub implements IPlanRepository {
    setContext(context: unknown): void { }

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

    async getSubscriptionByUserId(userId: string): Promise<SubscriptionEntity> {
        return testSubscriptionEntity;
    }

    async getSubscriptionByEndDate(endDate: Date): Promise<SubscriptionEntity> {
        return testSubscriptionEntity;
    }
}

export class UnitOfWorkRepositoryStub implements IUnitOfWorkRepository {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly userVerificationCodeRepository: IUserVerificationCodeRepository,
        private readonly customerRepository: ICustomerRepository,
        private readonly planRepository: IPlanRepository,
        private readonly subscriptionRepository: ISubscriptionRepository,
        private readonly userConsentRepository: IUserConsentRepository
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
        return null;
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return null;
    }

    async updateUserById(id: string, user: UserEntity): Promise<UserEntity> {
        return user;
    }

    async updateUserByEmail(email: string, user: UserEntity): Promise<UserEntity> {
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
}