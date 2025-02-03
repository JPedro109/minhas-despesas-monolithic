import {
    BcryptJSAdapter,
    ExtractAdapter,
    GenerationAdapter,
    WinstonAdapter,
    NotificationAdapter,
    StripeAdapter,
    SecurityAdapter,
    DatabaseSQLHelper,
    PrismaCustomerRepositoryAdapter,
    PrismaExpenseRepositoryAdapter,
    PrismaExtractRepositoryAdapter,
    PrismaPaymentHistoryRepositoryAdapter,
    PrismaPaymentMethodRepositoryAdapter,
    PrismaSubscriptionRepositoryAdapter,
    PrismaUserConsentRepositoryAdapter,
    PrismaUserRepositoryAdapter,
    PrismaUserVerificationCodeRepositoryAdapter,
    PrismaPlanRepositoryAdapter,
    PrismaUnitOfWorkRepositoryAdapter,
    S3BucketAdapter,
} from "@/layers/external";

export const bcryptJSAdapter = new BcryptJSAdapter();
export const extractAdapter = new ExtractAdapter();
export const generationAdapter = new GenerationAdapter();
export const winstonAdapter = new WinstonAdapter();
export const s3BucketAdapter = new S3BucketAdapter();
export const notificationAdapter = new NotificationAdapter();
export const stripeAdapter = new StripeAdapter();
export const securityAdapter = new SecurityAdapter();

export const databaseSQLHelper = new DatabaseSQLHelper();

export const prismaCustomerRepositoryAdapter =
    new PrismaCustomerRepositoryAdapter(databaseSQLHelper);
export const prismaExpenseRepositoryAdapter =
    new PrismaExpenseRepositoryAdapter(databaseSQLHelper);
export const prismaExtractRepositoryAdapter =
    new PrismaExtractRepositoryAdapter(databaseSQLHelper);
export const prismaPaymentHistoryRepositoryAdapter =
    new PrismaPaymentHistoryRepositoryAdapter(databaseSQLHelper);
export const prismaPaymentMethodRepositoryAdapter =
    new PrismaPaymentMethodRepositoryAdapter(databaseSQLHelper);
export const prismaUserRepositoryAdapter = new PrismaUserRepositoryAdapter(
    databaseSQLHelper,
);
export const prismaUserConsentRepositoryAdapter =
    new PrismaUserConsentRepositoryAdapter(databaseSQLHelper);
export const prismaUserVerificationCodeRepositoryAdapter =
    new PrismaUserVerificationCodeRepositoryAdapter(databaseSQLHelper);
export const prismaSubscriptionRepositoryAdapter =
    new PrismaSubscriptionRepositoryAdapter(databaseSQLHelper);
export const prismaPlanRepositoryAdapter = new PrismaPlanRepositoryAdapter(
    databaseSQLHelper,
);
export const makePrismaUnitOfWorkRepositoryAdapter =
    (): PrismaUnitOfWorkRepositoryAdapter =>
        new PrismaUnitOfWorkRepositoryAdapter(
            databaseSQLHelper,
            prismaUserRepositoryAdapter,
            prismaUserConsentRepositoryAdapter,
            prismaUserVerificationCodeRepositoryAdapter,
            prismaCustomerRepositoryAdapter,
            prismaPlanRepositoryAdapter,
            prismaSubscriptionRepositoryAdapter,
            prismaExpenseRepositoryAdapter,
            prismaPaymentMethodRepositoryAdapter,
            prismaPaymentHistoryRepositoryAdapter,
            prismaExtractRepositoryAdapter,
        );
