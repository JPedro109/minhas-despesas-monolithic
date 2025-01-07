import {
    executeChargeToExpiredSubscriptionsController,
    getUserSubscriptionController,
    manageSubscriptionRenewalController,
    sendNotificationOfSubscriptionThatAreComingDueController,
    updateSubscriptionController,
    updateSubscriptionRenewalStatusController,
    setFreePlanForNonRenewableSubscriptionsController,
    authenticationUserMiddleware,
    basicAuthenticationMiddleware,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/subscriptions/charge-expired",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(executeChargeToExpiredSubscriptionsController),
    );
    router.get(
        "/subscriptions",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(getUserSubscriptionController),
    );
    router.post(
        "/subscriptions/renew",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(manageSubscriptionRenewalController),
    );
    router.post(
        "/subscriptions/notify-due",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(
            sendNotificationOfSubscriptionThatAreComingDueController,
        ),
    );
    router.patch(
        "/subscriptions/plan/:newPlanId",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateSubscriptionController),
    );
    router.patch(
        "/subscriptions/renewal-status",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateSubscriptionRenewalStatusController),
    );
    router.post(
        "/subscriptions/set-free-plan",
        RestAdapter.middleware(basicAuthenticationMiddleware),
        RestAdapter.route(setFreePlanForNonRenewableSubscriptionsController),
    );
};
