jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/subscriptions/plan/:newPlanId - PATCH", () => {

    setup();

    const makeUrl = (id: string): string => `/api/subscriptions/plan/${id}`;

    test("Should not update subscription because user have the plan free", async () => {
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(409);
    });

    test("Should not update subscription, because downgrade to Free plan is restricted", async () => {
        const token = await loginRest("email-with-plan-gold-with-codes-expired-without-payment-method@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(403);
    });

    test("Should not update subscription to active because user does not have payment method", async () => {
        const token = await loginRest("email-with-plan-free-and-without-payment-method@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("00000000-0000-0000-0000-000000000001"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(403);
    });

    test("Should update subscription", async () => {
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("00000000-0000-0000-0000-000000000001"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(204);
    });
});