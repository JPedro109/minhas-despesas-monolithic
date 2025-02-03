import {
    CreateExpenseController,
    DeleteExpenseController,
    UpdateExpenseController,
    GetUserExtractsController,
    GetUserExpensesController,
    ExpenseUndoPaymentController,
    UpdatePreviousMonthPaidExpensesToUnpaidController,
    DeleteExpiredExtractsController,
    PayExpenseController,
    CreateUserController,
    DeleteUserController,
    RecoverUserPasswordController,
    RefreshUserTokenController,
    SendUserEmailUpdateCodeController,
    SendUserPasswordRecoveryCodeController,
    UpdateUserEmailController,
    UpdateUserPasswordController,
    UpdateUsernameController,
    UserLoginController,
    VerifyUserEmailController,
    GetUserSubscriptionController,
    UpdateSubscriptionRenewalStatusController,
    GetPlansController,
    CreatePaymentMethodController,
    DeletePaymentMethodController,
    GetUserPaymentMethodController,
    UpdatePaymentMethodNameController,
    UpdatePaymentMethodTokenController,
    CreateExtractController,
    AuthenticateUserMiddleware,
    BasicAuthenticationMiddleware,
    CreateSubscriptionController,
    SubscriptionWebhookController,
} from "@/layers/presentation";

import {
    createUserUseCase,
    deleteUserUseCase,
    recoverUserPasswordUseCase,
    refreshUserTokenUseCase,
    sendUserEmailUpdateCodeUseCase,
    sendUserPasswordRecoveryCodeUseCase,
    updateUserEmailUseCase,
    updateUserPasswordUseCase,
    updateUsernameUseCase,
    userLoginUseCase,
    verifyUserEmailUseCase,
    getUserSubscriptionUseCase,
    updateSubscriptionRenewalStatusUseCase,
    getPlansUseCase,
    createPaymentMethodUseCase,
    deletePaymentMethodUseCase,
    getUserPaymentMethodUseCase,
    updatePaymentMethodNameUseCase,
    updatePaymentMethodTokenUseCase,
    createExtractUseCase,
    deleteExpiredExtractsUseCase,
    getUserExtractsUseCase,
    createExpenseUseCase,
    deleteExpenseUseCase,
    expenseUndoPaymentUseCase,
    getUserExpensesUseCase,
    payExpenseUseCase,
    updateExpenseUseCase,
    updatePreviousMonthPaidExpensesToUnpaidUseCase,
    createSubscriptionUseCase,
    notifyUserOfSubscriptionPaymentFailureUseCase,
} from "./use-cases";
import { securityAdapter, stripeAdapter, winstonAdapter } from "./external";

export const createUserController = new CreateUserController(
    createUserUseCase,
    winstonAdapter,
);

export const deleteUserController = new DeleteUserController(
    deleteUserUseCase,
    winstonAdapter,
);

export const recoverUserPasswordController = new RecoverUserPasswordController(
    recoverUserPasswordUseCase,
    winstonAdapter,
);

export const refreshUserTokenController = new RefreshUserTokenController(
    refreshUserTokenUseCase,
    winstonAdapter,
);

export const sendUserEmailUpdateCodeController =
    new SendUserEmailUpdateCodeController(
        sendUserEmailUpdateCodeUseCase,
        winstonAdapter,
    );

export const sendUserPasswordRecoveryCodeController =
    new SendUserPasswordRecoveryCodeController(
        sendUserPasswordRecoveryCodeUseCase,
        winstonAdapter,
    );

export const updateUserEmailController = new UpdateUserEmailController(
    updateUserEmailUseCase,
    winstonAdapter,
);

export const updateUserPasswordController = new UpdateUserPasswordController(
    updateUserPasswordUseCase,
    winstonAdapter,
);

export const updateUsernameController = new UpdateUsernameController(
    updateUsernameUseCase,
    winstonAdapter,
);

export const userLoginController = new UserLoginController(
    userLoginUseCase,
    winstonAdapter,
);

export const verifyUserEmailController = new VerifyUserEmailController(
    verifyUserEmailUseCase,
    winstonAdapter,
);

export const createSubscriptionController = new CreateSubscriptionController(
    createSubscriptionUseCase,
    winstonAdapter,
);

export const getUserSubscriptionController = new GetUserSubscriptionController(
    getUserSubscriptionUseCase,
    winstonAdapter,
);

export const updateSubscriptionRenewalStatusController =
    new UpdateSubscriptionRenewalStatusController(
        updateSubscriptionRenewalStatusUseCase,
        winstonAdapter,
    );

export const subscriptionWebhookController = new SubscriptionWebhookController(
    stripeAdapter,
    notifyUserOfSubscriptionPaymentFailureUseCase,
    winstonAdapter,
);

export const getPlansController = new GetPlansController(
    getPlansUseCase,
    winstonAdapter,
);

export const createPaymentMethodController = new CreatePaymentMethodController(
    createPaymentMethodUseCase,
    winstonAdapter,
);

export const deletePaymentMethodController = new DeletePaymentMethodController(
    deletePaymentMethodUseCase,
    winstonAdapter,
);

export const getUserPaymentMethodController =
    new GetUserPaymentMethodController(
        getUserPaymentMethodUseCase,
        winstonAdapter,
    );

export const updatePaymentMethodNameController =
    new UpdatePaymentMethodNameController(
        updatePaymentMethodNameUseCase,
        winstonAdapter,
    );

export const updatePaymentMethodTokenController =
    new UpdatePaymentMethodTokenController(
        updatePaymentMethodTokenUseCase,
        winstonAdapter,
    );

export const createExtractController = new CreateExtractController(
    createExtractUseCase,
    winstonAdapter,
);

export const deleteExpiredExtractsController =
    new DeleteExpiredExtractsController(
        deleteExpiredExtractsUseCase,
        winstonAdapter,
    );

export const getUserExtractsController = new GetUserExtractsController(
    getUserExtractsUseCase,
    winstonAdapter,
);

export const createExpenseController = new CreateExpenseController(
    createExpenseUseCase,
    winstonAdapter,
);

export const deleteExpenseController = new DeleteExpenseController(
    deleteExpenseUseCase,
    winstonAdapter,
);

export const expenseUndoPaymentController = new ExpenseUndoPaymentController(
    expenseUndoPaymentUseCase,
    winstonAdapter,
);

export const getUserExpensesController = new GetUserExpensesController(
    getUserExpensesUseCase,
    winstonAdapter,
);

export const payExpenseController = new PayExpenseController(
    payExpenseUseCase,
    winstonAdapter,
);

export const updateExpenseController = new UpdateExpenseController(
    updateExpenseUseCase,
    winstonAdapter,
);

export const updatePreviousMonthPaidExpensesToUnpaidController =
    new UpdatePreviousMonthPaidExpensesToUnpaidController(
        updatePreviousMonthPaidExpensesToUnpaidUseCase,
        winstonAdapter,
    );

export const authenticationUserMiddleware = new AuthenticateUserMiddleware(
    securityAdapter,
    winstonAdapter,
);

export const basicAuthenticationMiddleware = new BasicAuthenticationMiddleware(
    securityAdapter,
    winstonAdapter,
);
