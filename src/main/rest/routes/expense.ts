import { AuthorizationUserActionMiddleware } from "@/layers/presentation";
import {
    createExpenseController,
    deleteExpenseController,
    expenseUndoPaymentController,
    getUserExpensesController,
    payExpenseController,
    sendNotificationOfExpensesThatAreComingDueController,
    updateExpenseController,
    updatePreviousMonthPaidExpensesToUnpaidController,
    authenticationUserMiddleware,
    basicAuthenticationMiddleware,
    getUserSubscriptionUseCase,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/expenses",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "create:expense",
            ),
        ),
        RestAdapter.route(createExpenseController),
    );
    router.delete(
        "/expenses/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "delete:expense",
            ),
        ),
        RestAdapter.route(deleteExpenseController),
    );
    router.patch(
        "/expenses/undo-payment/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "undo-payment:expense",
            ),
        ),
        RestAdapter.route(expenseUndoPaymentController),
    );
    router.get(
        "/expenses",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "get:expense",
            ),
        ),
        RestAdapter.route(getUserExpensesController),
    );
    router.patch(
        "/expenses/pay/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "pay:expense",
            ),
        ),
        RestAdapter.route(payExpenseController),
    );
    router.put(
        "/expenses/:id",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.middleware(
            new AuthorizationUserActionMiddleware(
                getUserSubscriptionUseCase,
                "update:expense",
            ),
        ),
        RestAdapter.route(updateExpenseController),
    );
    router.post(
        "/expenses/notify-due",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(sendNotificationOfExpensesThatAreComingDueController),
    );
    router.post(
        "/expenses/update-unpaid",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(updatePreviousMonthPaidExpensesToUnpaidController),
    );
};
