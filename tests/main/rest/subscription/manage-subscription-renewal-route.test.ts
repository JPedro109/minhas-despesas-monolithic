jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (renew: unknown): object => {
    return { renew };
};

describe("/api/subscriptions/renew - POST", () => {

    setup();

    test("Should not manage subscription because field is invalid", async () => {
        const body = makeBody(undefined);
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should manage subscription adding a new subscription with the same plan", async () => {
        const body = makeBody(true);
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });

    test("Should manage subscription adding a new subscription with plan free", async () => {
        const body = makeBody(false);
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});