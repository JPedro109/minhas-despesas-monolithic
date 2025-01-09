import {
    createExpense,
    createExtract,
    createPaymentMethod,
    createUser,
    deleteExpense,
    deleteExpiredExtracts,
    deletePaymentMethod,
    deleteUser,
    executeChargeToExpiredSubscriptions,
    expenseUndoPayment,
    getPlans,
    getUserExpenses,
    getUserExtracts,
    getUserPaymentMethod,
    getUserPlan,
    getUserSubscription,
    manageSubscriptionRenewal,
    payExpense,
    recoverUserPassword,
    refreshUserToken,
    sendnotificationOfexpensesThatAreComingDue,
    sendNotificationOfSubscriptionsThatAreComingDue,
    sendUserEmailUpdateLink,
    sendUserPasswordRecoverLink,
    setFreePlanForNonRenewableSubscriptions,
    updateExpense,
    updatePaymentMethodName,
    updatePaymentMethodToken,
    updatePreviousMonthPaidExpensesToUnpaid,
    updateSubscription,
    updateSubscriptionRenewalStatus,
    updateUserEmail,
    updateUsername,
    updateUserPassword,
    userLogin,
    verifyUserEmail,
} from "./paths";

const swaggerSetup = {
    swagger: "2.0",
    info: {
        title: "API de Gerenciamento de Despesas",
        description: "API para gerenciamento de despesas.",
        version: "1.0.0",
    },
    produces: ["application/json"],
    tags: [
        { name: "Expense", description: "Rotas relacionadas a despesas" },
        { name: "Extract", description: "Rotas relacionadas a extratos" },
        {
            name: "Payment Method",
            description: "Rotas relacionadas a métodos de pagamento",
        },
        { name: "Plan", description: "Rotas relacionadas a planos" },
        {
            name: "Subscription",
            description: "Rotas relacionadas a assinaturas",
        },
        { name: "User", description: "Rotas relacionadas a usuários" },
    ],
    paths: {
        // Expenses
        "/api/expenses": {
            post: createExpense,
            get: getUserExpenses,
        },
        "/api/expenses/{id}": {
            put: updateExpense,
            delete: deleteExpense,
        },
        "/api/expenses/undo-payment/{id}": {
            patch: expenseUndoPayment,
        },
        "/api/expenses/pay/{id}": {
            patch: payExpense,
        },
        "/api/expenses/notify-due": {
            post: sendnotificationOfexpensesThatAreComingDue,
        },
        "/api/expenses/update-unpaid": {
            post: updatePreviousMonthPaidExpensesToUnpaid,
        },

        // Extracts
        "/api/extracts": {
            post: createExtract,
            get: getUserExtracts,
        },
        "/api/extracts/expired": {
            delete: deleteExpiredExtracts,
        },

        // Payment Methods
        "/api/payment-methods": {
            post: createPaymentMethod,
            get: getUserPaymentMethod,
        },
        "/api/payment-methods/{id}": {
            delete: deletePaymentMethod,
        },
        "/api/payment-methods/name/{id}": {
            patch: updatePaymentMethodName,
        },
        "/api/payment-methods/token/{id}": {
            patch: updatePaymentMethodToken,
        },

        // Plans
        "/api/plans": {
            get: getPlans,
        },
        "/api/plans/user": {
            get: getUserPlan,
        },

        // Subscriptions
        "/api/subscriptions/charge-expired": {
            post: executeChargeToExpiredSubscriptions,
        },
        "/api/subscriptions": {
            get: getUserSubscription,
        },
        "/api/subscriptions/renew": {
            post: manageSubscriptionRenewal,
        },
        "/api/subscriptions/notify-due": {
            post: sendNotificationOfSubscriptionsThatAreComingDue,
        },
        "/api/subscriptions/plan/{newPlanId}": {
            patch: updateSubscription,
        },
        "/api/subscriptions/renewal-status": {
            patch: updateSubscriptionRenewalStatus,
        },
        "/api/subscriptions/set-free-plan": {
            post: setFreePlanForNonRenewableSubscriptions,
        },

        // Users
        "/api/users": {
            post: createUser,
            delete: deleteUser,
        },
        "/api/users/verify-email": {
            patch: verifyUserEmail,
        },
        "/api/users/login": {
            post: userLogin,
        },
        "/api/users/refresh-token": {
            post: refreshUserToken,
        },
        "/api/users/send-email-update-link": {
            post: sendUserEmailUpdateLink,
        },
        "/api/users/email": {
            patch: updateUserEmail,
        },
        "/api/users/send-password-recovery-link": {
            post: sendUserPasswordRecoverLink,
        },
        "/api/users/password-recover": {
            patch: recoverUserPassword,
        },
        "/api/users/password": {
            patch: updateUserPassword,
        },
        "/api/users/username": {
            patch: updateUsername,
        },
    },
};

export default swaggerSetup;
