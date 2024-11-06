import { 
    IUserRepository, 
    IUserVerificationCodeRepository, 
    ICustomerRepository, 
    IPlanRepository, 
    ISubscriptionRepository, 
    IUserConsentRepository,
    IExpenseRepository,
    IPaymentMethodRepository,
    IPaymentHistoryRepository,
    IExtractRepository
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
    getPaymentHistoryRepository(): IPaymentHistoryRepository;
    getExtractRepository(): IExtractRepository;
}