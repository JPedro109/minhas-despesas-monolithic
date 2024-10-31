import { 
    IUserRepository, 
    IUserVerificationCodeRepository, 
    ICustomerRepository, 
    IPlanRepository, 
    ISubscriptionRepository, 
    IUserConsentRepository,
    IExpenseRepository,
    IPaymentMethodRepository,
    IPaymentHistoryRepository
} from "@/layers/application";

export interface IUnitOfWorkRepository {
    transaction(querys: () => Promise<void>): Promise<void>;
    getUserRepository(): IUserRepository;
    getUserConsentRepository(): IUserConsentRepository;
    getUserVerificationCodeRepository(): IUserVerificationCodeRepository;
    getCustomerRepository(): ICustomerRepository;
    getPlanRepository(): IPlanRepository;
    getSubscriptionRepository(): ISubscriptionRepository;
    getExpenseRepository(): IExpenseRepository;
    getPaymentMethodRepository(): IPaymentMethodRepository;
    getPaymentHistory(): IPaymentHistoryRepository
}