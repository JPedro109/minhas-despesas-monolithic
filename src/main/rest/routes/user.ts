import {
    createUserController,
    deleteUserController,
    recoverUserPasswordController,
    refreshUserTokenController,
    sendUserEmailUpdateCodeController,
    sendUserPasswordRecoveryCodeController,
    updateUserEmailController,
    updateUserPasswordController,
    updateUsernameController,
    userLoginController,
    verifyUserEmailController,
    authenticationUserMiddleware,
} from "@/main/factories";
import { RestAdapter } from "@/main/rest";

import { Router } from "express";

export default (router: Router): void => {
    router.post("/users", RestAdapter.route(createUserController));
    router.patch(
        "/users/verify-email",
        RestAdapter.route(verifyUserEmailController),
    );
    router.post("/users/login", RestAdapter.route(userLoginController));
    router.post(
        "/users/refresh-token",
        RestAdapter.route(refreshUserTokenController),
    );
    router.delete(
        "/users",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(deleteUserController),
    );
    router.post(
        "/users/send-email-update-link",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(sendUserEmailUpdateCodeController),
    );
    router.post(
        "/users/send-password-recovery-link",
        RestAdapter.route(sendUserPasswordRecoveryCodeController),
    );
    router.patch(
        "/users/email",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateUserEmailController),
    );
    router.patch(
        "/users/username",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateUsernameController),
    );
    router.patch(
        "/users/password-recover",
        RestAdapter.route(recoverUserPasswordController),
    );
    router.patch(
        "/users/password",
        RestAdapter.middleware(authenticationUserMiddleware),
        RestAdapter.route(updateUserPasswordController),
    );
};
