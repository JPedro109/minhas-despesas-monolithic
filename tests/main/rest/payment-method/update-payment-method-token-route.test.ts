jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (token: unknown): object => {
    return { token };
};

describe("/api/payment-methods/token/:id - PATCH", () => {
    setup();

    const makeUrl = (id: string): string => `/api/payment-methods/token/${id}`;

    test("Should not update payment method because token is empty", async () => {
        const validId = "00000000-0000-0000-0000-000000000000";
        const body = makeBody("");
        const token = await loginRest("email-with-plan-gold@test.com");

        const response = await request(setupServer())
            .patch(makeUrl(validId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not update payment method token when the payment method does not exist", async () => {
        const nonExistentId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
        const body = makeBody("pm_card_visa");
        const token = await loginRest(
            "email-with-plan-gold-with-codes-expired-without-payment-method@test.com",
        );

        const response = await request(setupServer())
            .patch(makeUrl(nonExistentId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should update the payment method token successfully", async () => {
        const validId = "00000000-0000-0000-0000-000000000000";
        const body = makeBody("pm_card_visa");
        const token = await loginRest("email-with-plan-gold@test.com");

        const response = await request(setupServer())
            .patch(makeUrl(validId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
