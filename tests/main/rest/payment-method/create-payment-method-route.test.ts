jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (name: unknown, token: unknown): object => {
    return { name, token };
};

describe("/api/payment-methods - POST", () => {
    setup();

    test("Should not create a payment method because fields are empty", async () => {
        const body = makeBody("", "");
        const token = await loginRest("email-with-plan-gold@test.com");

        const response = await request(setupServer())
            .post("/api/payment-methods")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not create a payment method because one already exists", async () => {
        const body = makeBody("Duplicate Method Name", "pm_card_visa");
        const token = await loginRest("email-with-plan-gold@test.com");

        const response = await request(setupServer())
            .post("/api/payment-methods")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(409);
        expect(response.body.code).toBe("ConflictedError");
    });

    test("Should create a payment method successfully", async () => {
        const body = makeBody("Valid Method Name", "pm_card_visa");
        const token = await loginRest(
            "email-with-plan-gold-with-codes-expired-without-payment-method@test.com",
        );

        const response = await request(setupServer())
            .post("/api/payment-methods")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(201);
    });
});
