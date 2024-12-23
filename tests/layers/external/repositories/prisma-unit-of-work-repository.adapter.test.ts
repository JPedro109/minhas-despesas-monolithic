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
        const sut = new PrismaUnitOfWorkRepositoryAdapter(
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

        const userRepository = sut.getUserRepository();
        const userConsentRepository = sut.getUserConsentRepository();
        const userVerificationCodeRepository = sut.getUserVerificationCodeRepository();
        const customerRepository = sut.getCustomerRepository();
        const planRepository = sut.getPlanRepository();
        const subscriptionRepository = sut.getSubscriptionRepository();
        const expenseRepository = sut.getExpenseRepository();
        const paymentMethodRepository = sut.getPaymentMethodRepository();
        const paymentHistoryRepository = sut.getPaymentHistoryRepository();
        const extractRepository = sut.getExtractRepository();

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

    test("Should execute transaction with error", async () => {
        const sut = new PrismaUnitOfWorkRepositoryAdapter(
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

        const result = async (): Promise<void> => await sut.transaction(async () => { throw new Error(); });

        expect(result).rejects.toThrow(Error);
    });

    test("Should execute transaction", async () => {
        const sut = new PrismaUnitOfWorkRepositoryAdapter(
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
        const transactionSpy = jest.spyOn(sut, "transaction");

        await sut.transaction(async () => {});

        expect(transactionSpy).toHaveBeenCalled();
    });
});