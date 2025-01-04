jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/payment-methods/:id - DELETE", () => {

    setup();

    const makeUrl = (id: string): string => `/api/payment-methods/${id}`;

    test("Should not delete a payment method because it does not exist", async () => {
        const nonExistentId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
        const token = await loginRest("email-with-plan-free-with-codes-expired-without-payment-method@test.com");

        const response = await request(setupServer())
            .delete(makeUrl(nonExistentId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
        expect(response.body.message).toBe("Esse método de pagamento não existe");
    });

    test("Should not delete a payment method because the user has an active renewable subscription", async () => {
        const renewableSubscriptionPaymentMethodId = "00000000-0000-0000-0000-000000000003";
        const token = await loginRest("email-with-plan-gold@test.com");

        const response = await request(setupServer())
            .delete(makeUrl(renewableSubscriptionPaymentMethodId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(403);
        expect(response.body.code).toBe("ForbiddenError");
    });

    test("Should delete a payment method successfully", async () => {
        const validPaymentMethodId = "00000000-0000-0000-0000-000000000000";
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .delete(makeUrl(validPaymentMethodId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(204);
    });
});