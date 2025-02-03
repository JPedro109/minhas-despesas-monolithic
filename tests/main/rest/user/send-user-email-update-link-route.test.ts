jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup, loginRest } from "../../__mocks__";
import request from "supertest";

const makeBody = (email: unknown): object => {
    return { email };
};

describe("/api/users/send-email-update-link - POST", () => {
    setup();

    test("Should not send email update link because email is missing", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const body = makeBody("");

        const response = await request(setupServer())
            .post("/api/users/send-email-update-link")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not send email update link because email is already registered", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const body = makeBody("email-verified-with-valid-codes@test.com");

        const response = await request(setupServer())
            .post("/api/users/send-email-update-link")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(409);
        expect(response.body.code).toBe("ConflictedError");
    });

    test("Should send email update link successfully", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const body = makeBody("new_email@example.com");

        const response = await request(setupServer())
            .post("/api/users/send-email-update-link")
            .set("authorization", `Bearer ${token.accessToken}`)
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
