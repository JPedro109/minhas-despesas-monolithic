import {
    getPlansController,
    getUserPlanController,
    authenticationUserMiddleware,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.get(
        "/plans",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(getPlansController)
    );
    router.get(
        "/plans/user",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(getUserPlanController)
    );
};