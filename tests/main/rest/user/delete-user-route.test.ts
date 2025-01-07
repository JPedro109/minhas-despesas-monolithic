jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";

import { setup, loginRest } from "../../__mocks__";

import request from "supertest";

const makeBody = (password: unknown, passwordConfirm: unknown): object => {
    return {
        password,
        passwordConfirm,
    };
};

describe("/api/users - DELETE", () => {
    setup();

    test("Should not delete user because password fields are empty", async () => {
        const body = makeBody("", "");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .delete("/api/users")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not delete user because passwords is not match", async () => {
        const body = makeBody("Password1234", "Password12345");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .delete("/api/users")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not delete user because password is invalid", async () => {
        const body = makeBody("password", "password");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .delete("/api/users")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should delete user", async () => {
        const body = makeBody("Password1234", "Password1234");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .delete("/api/users")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
