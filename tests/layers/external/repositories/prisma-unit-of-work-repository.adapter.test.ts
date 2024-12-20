import { 
    PrismaCustomerRepositoryAdapter, 
    PrismaExpenseRepositoryAdapter, 
    PrismaExtractRepositoryAdapter, 
    PrismaPaymentHistoryRepositoryAdapter, 
    PrismaPaymentMethodRepositoryAdapter, 
    PrismaPlanRepositoryAdapter, 
    PrismaSubscriptionRepositoryAdapter, 
    PrismaUnitOfWorkRepositoryAdapter, 
    PrismaUserConsentRepositoryAdapter, 
    PrismaUserRepositoryAdapter, 
    PrismaUserVerificationCodeRepositoryAdapter 
} from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";

describe("External - PrismaUnitOfWorkRepositoryAdapter", () => {
    const databaseSQLHelper = new DatabaseSQLHelper();

    test("Should return the correct repository instances", async () => {
        const unitOfWork = new PrismaUnitOfWorkRepositoryAdapter(
            databaseSQLHelper,
            new PrismaUserRepositoryAdapter(databaseSQLHelper),
            new PrismaUserConsentRepositoryAdapter(databaseSQLHelper),
            new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper),
            new PrismaCustomerRepositoryAdapter(databaseSQLHelper),
            new PrismaPlanRepositoryAdapter(databaseSQLHelper),
            new PrismaSubscriptionRepositoryAdapter(databaseSQLHelper),
            new PrismaExpenseRepositoryAdapter(databaseSQLHelper),
            new PrismaPaymentMethodRepositoryAdapter(databaseSQLHelper),
            new PrismaPaymentHistoryRepositoryAdapter(databaseSQLHelper),
            new PrismaExtractRepositoryAdapter(databaseSQLHelper)
        );

        const userRepository = unitOfWork.getUserRepository();
        const userConsentRepository = unitOfWork.getUserConsentRepository();
        const userVerificationCodeRepository = unitOfWork.getUserVerificationCodeRepository();
        const customerRepository = unitOfWork.getCustomerRepository();
        const planRepository = unitOfWork.getPlanRepository();
        const subscriptionRepository = unitOfWork.getSubscriptionRepository();
        const expenseRepository = unitOfWork.getExpenseRepository();
        const paymentMethodRepository = unitOfWork.getPaymentMethodRepository();
        const paymentHistoryRepository = unitOfWork.getPaymentHistoryRepository();
        const extractRepository = unitOfWork.getExtractRepository();

        expect(userRepository).toBeDefined();
        expect(userConsentRepository).toBeDefined();
        expect(userVerificationCodeRepository).toBeDefined();
        expect(customerRepository).toBeDefined();
        expect(planRepository).toBeDefined();
        expect(subscriptionRepository).toBeDefined();
        expect(expenseRepository).toBeDefined();
        expect(paymentMethodRepository).toBeDefined();
        expect(paymentHistoryRepository).toBeDefined();
        expect(extractRepository).toBeDefined();
    });
});