jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/payment-methods/:id - DELETE", () => {
    setup();

    const makeUrl = (id: string): string => `/api/payment-methods/${id}`;

    test("Should not delete a payment method because it does not exist", async () => {
        const nonExistentId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
        const token = await loginRest(
            "email-verified-with-exclude-payment-method-and-sub-with-full@test.com",
        );

        const response = await request(setupServer())
            .delete(makeUrl(nonExistentId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should delete a payment method successfully", async () => {
        const validPaymentMethodId = "00000000-0000-0000-0000-000000000003";
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .delete(makeUrl(validPaymentMethodId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(204);
    });
});
