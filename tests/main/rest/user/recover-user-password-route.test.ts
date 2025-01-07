jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";

import { setup } from "../../__mocks__";

import request from "supertest";

const makeBody = (
    code: unknown,
    password: unknown,
    passwordConfirm: unknown,
): object => {
    return {
        code,
        password,
        passwordConfirm,
    };
};

describe("/api/users/password-recover - PATCH", () => {
    setup();

    test("Should not recover password because fields are empty", async () => {
        const body = makeBody("", "", "");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not recover password because passwords do not match", async () => {
        const body = makeBody("000001", "Password1234", "Password12345");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not recover password because code is invalid", async () => {
        const body = makeBody("999999", "Password1234", "Password1234");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not recover password because code is expired", async () => {
        const body = makeBody("000004", "Password1234", "Password1234");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not recover password because new password is the same as the current password", async () => {
        const body = makeBody("000001", "Password1234", "Password1234");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should recover password successfully", async () => {
        const body = makeBody("000001", "NewPassword123", "NewPassword123");

        const response = await request(setupServer())
            .patch("/api/users/password-recover")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
