jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (
    password: unknown,
    newPassword: unknown,
    newPasswordConfirm: unknown
): object => {
    return { password, newPassword, newPasswordConfirm };
};

describe("/api/users/password - PATCH", () => {

    setup();

    test("Should not update password because newPassword and newPasswordConfirm do not match", async () => {
        const token = await loginRest("email-with-plan-free@test.com");
        const body = makeBody("Password1234", "Password12345", "Password123456");

        const response = await request(setupServer())
            .patch("/api/users/password")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not update password because the current is incorrect", async () => {
        const token = await loginRest("email-with-plan-free@test.com");
        const body = makeBody("Password1234567", "Password1234", "Password1234");

        const response = await request(setupServer())
            .patch("/api/users/password")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not update password because the new password is the same as the current one", async () => {
        const token = await loginRest("email-with-plan-free@test.com");
        const body = makeBody("Password1234", "Password1234", "Password1234");

        const response = await request(setupServer())
            .patch("/api/users/password")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should update password successfully", async () => {
        const token = await loginRest("email-with-plan-free@test.com");
        const body = makeBody("Password1234", "Password12345", "Password12345");

        const response = await request(setupServer())
            .patch("/api/users/password")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});