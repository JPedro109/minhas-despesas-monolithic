import {
    createPaymentMethodController,
    deletePaymentMethodController,
    getUserPaymentMethodController,
    updatePaymentMethodNameController,
    updatePaymentMethodTokenController,
    authenticationUserMiddleware
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post(
        "/payment-methods",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(createPaymentMethodController)
    );
    router.delete(
        "/payment-methods",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(deletePaymentMethodController)
    );
    router.get(
        "/payment-methods",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(getUserPaymentMethodController)
    );
    router.patch(
        "/payment-methods/name",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updatePaymentMethodNameController)
    );
    router.patch(
        "/payment-methods/token",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updatePaymentMethodTokenController)
    );
};