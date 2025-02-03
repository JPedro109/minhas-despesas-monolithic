jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (email: unknown, code: unknown): object => {
    return { email, code };
};

describe("/api/users/email - PATCH", () => {
    setup();

    test("Should not update email because fields are missing", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const body = makeBody("", "");

        const response = await request(setupServer())
            .patch("/api/users/email")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not update email because code is invalid", async () => {
        const body = makeBody("newemail@example.com", "999999");
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/users/email")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not update email because code type is invalid", async () => {
        const body = makeBody("newemail@example.com", "000002");
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/users/email")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not update email because code is expired", async () => {
        const body = makeBody("newemail@example.com", "000003");
        const token = await loginRest(
            "email-verified-with-invalid-codes@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/users/email")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should update email successfully", async () => {
        const body = makeBody("newemail@example.com", "000001");
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );

        const response = await request(setupServer())
            .patch("/api/users/email")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
