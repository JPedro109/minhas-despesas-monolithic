import {
    createSubscriptionController,
    getUserSubscriptionController,
    updateSubscriptionRenewalStatusController,
    authenticationUserMiddleware,
    subscriptionWebhookController,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/subscriptions",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(createSubscriptionController),
    );
    router.get(
        "/subscriptions",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(getUserSubscriptionController),
    );
    router.patch(
        "/subscriptions/renewal-status",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateSubscriptionRenewalStatusController),
    );
    router.post(
        "/subscriptions/webhook",
        RestAdapter.route(subscriptionWebhookController),
    );
};
