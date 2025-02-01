import {
    CreateExpenseUseCase,
    DeleteExpenseUseCase,
    UpdateExpenseUseCase,
    GetUserExtractsUseCase,
    GetUserExpensesUseCase,
    ExpenseUndoPaymentUseCase,
    UpdatePreviousMonthPaidExpensesToUnpaidUseCase,
    DeleteExpiredExtractsUseCase,
    PayExpenseUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    RecoverUserPasswordUseCase,
    RefreshUserTokenUseCase,
    SendUserEmailUpdateLinkUseCase,
    SendUserPasswordRecoveryLinkUseCase,
    UpdateUserEmailUseCase,
    UpdateUserPasswordUseCase,
    UpdateUsernameUseCase,
    UserLoginUseCase,
    VerifyUserEmailUseCase,
    GetUserSubscriptionUseCase,
    UpdateSubscriptionRenewalStatusUseCase,
    GetPlansUseCase,
    CreatePaymentMethodUseCase,
    DeletePaymentMethodUseCase,
    GetUserPaymentMethodUseCase,
    UpdatePaymentMethodNameUseCase,
    UpdatePaymentMethodTokenUseCase,
    CreateExtractUseCase,
    CreateSubscriptionUseCase,
} from "@/layers/application";

import {
    bcryptJSAdapter,
    extractAdapter,
    generationAdapter,
    notificationAdapter,
    makePrismaUnitOfWorkRepositoryAdapter,
    s3BucketAdapter,
    securityAdapter,
    stripeAdapter,
} from "./external";

export const createUserUseCase = new CreateUserUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    notificationAdapter,
    bcryptJSAdapter,
    generationAdapter,
    stripeAdapter,
);

export const deleteUserUseCase = new DeleteUserUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    bcryptJSAdapter,
    stripeAdapter,
);

export const recoverUserPasswordUseCase = new RecoverUserPasswordUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    bcryptJSAdapter,
);

export const refreshUserTokenUseCase = new RefreshUserTokenUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    securityAdapter,
);

export const sendUserEmailUpdateLinkUseCase =
    new SendUserEmailUpdateLinkUseCase(
        makePrismaUnitOfWorkRepositoryAdapter(),
        notificationAdapter,
        generationAdapter,
    );

export const sendUserPasswordRecoveryLinkUseCase =
    new SendUserPasswordRecoveryLinkUseCase(
        makePrismaUnitOfWorkRepositoryAdapter(),
        notificationAdapter,
        generationAdapter,
    );

export const updateUserEmailUseCase = new UpdateUserEmailUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    stripeAdapter,
);

export const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    bcryptJSAdapter,
);

export const updateUsernameUseCase = new UpdateUsernameUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const userLoginUseCase = new UserLoginUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    bcryptJSAdapter,
    securityAdapter,
);

export const verifyUserEmailUseCase = new VerifyUserEmailUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const createSubscriptionUseCase = new CreateSubscriptionUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    stripeAdapter,
);

export const getUserSubscriptionUseCase = new GetUserSubscriptionUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    stripeAdapter,
);

export const updateSubscriptionRenewalStatusUseCase =
    new UpdateSubscriptionRenewalStatusUseCase(
        makePrismaUnitOfWorkRepositoryAdapter(),
        stripeAdapter,
    );

export const getPlansUseCase = new GetPlansUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const createPaymentMethodUseCase = new CreatePaymentMethodUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    stripeAdapter,
);

export const deletePaymentMethodUseCase = new DeletePaymentMethodUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    stripeAdapter,
);

export const getUserPaymentMethodUseCase = new GetUserPaymentMethodUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const updatePaymentMethodNameUseCase =
    new UpdatePaymentMethodNameUseCase(makePrismaUnitOfWorkRepositoryAdapter());

export const updatePaymentMethodTokenUseCase =
    new UpdatePaymentMethodTokenUseCase(
        makePrismaUnitOfWorkRepositoryAdapter(),
        stripeAdapter,
    );

export const createExtractUseCase = new CreateExtractUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
    extractAdapter,
    s3BucketAdapter,
);

export const deleteExpiredExtractsUseCase = new DeleteExpiredExtractsUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const getUserExtractsUseCase = new GetUserExtractsUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const createExpenseUseCase = new CreateExpenseUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const deleteExpenseUseCase = new DeleteExpenseUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const expenseUndoPaymentUseCase = new ExpenseUndoPaymentUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const getUserExpensesUseCase = new GetUserExpensesUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const payExpenseUseCase = new PayExpenseUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const updateExpenseUseCase = new UpdateExpenseUseCase(
    makePrismaUnitOfWorkRepositoryAdapter(),
);

export const updatePreviousMonthPaidExpensesToUnpaidUseCase =
    new UpdatePreviousMonthPaidExpensesToUnpaidUseCase(
        makePrismaUnitOfWorkRepositoryAdapter(),
    );
