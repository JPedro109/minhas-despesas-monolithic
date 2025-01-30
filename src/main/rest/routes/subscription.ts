import {
    getUserSubscriptionController,
    updateSubscriptionRenewalStatusController,
    authenticationUserMiddleware,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
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
};
