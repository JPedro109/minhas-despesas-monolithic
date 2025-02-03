jest.setTimeout(15000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (planId: unknown): object => {
    return { planId };
};

describe("/api/subscriptions - POST", () => {
    setup();

    test("Should not create subscription because schema is invalid", async () => {
        const body = makeBody(undefined);
        const token = await loginRest(
            "email-verified-with-payment-method@test.com",
        );

        const response = await request(setupServer())
            .post("/api/subscriptions")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not create subscription if payment method does not exist", async () => {
        const body = makeBody("1");
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );

        const response = await request(setupServer())
            .post("/api/subscriptions")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should not create subscription if plan does not exist", async () => {
        const body = makeBody("ffffffff-ffff-ffff-ffff-ffffffffffff");
        const token = await loginRest(
            "email-verified-with-payment-method@test.com",
        );

        const response = await request(setupServer())
            .post("/api/subscriptions")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should create a subscription successfully", async () => {
        const body = makeBody("00000000-0000-0000-0000-000000000001");
        const token = await loginRest(
            "email-verified-with-payment-method@test.com",
        );

        const response = await request(setupServer())
            .post("/api/subscriptions")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(201);
    });
});
