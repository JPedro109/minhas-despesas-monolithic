jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (name: unknown): object => {
    return { name };
};

describe("/api/payment-methods/name/:id - PATCH", () => {
    setup();

    const makeUrl = (id: string): string => `/api/payment-methods/name/${id}`;

    test("Should not update payment method because name is empty", async () => {
        const validId = "00000000-0000-0000-0000-000000000003";
        const body = makeBody("");
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .patch(makeUrl(validId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not update payment method name when the payment method does not exist", async () => {
        const nonExistentId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
        const body = makeBody("New Payment Method Name");
        const token = await loginRest(
            "email-verified-with-exclude-payment-method-and-sub-with-full@test.com",
        );

        const response = await request(setupServer())
            .patch(makeUrl(nonExistentId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should update the payment method name successfully", async () => {
        const validId = "00000000-0000-0000-0000-000000000003";
        const body = makeBody("Updated Payment Method Name");
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .patch(makeUrl(validId))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
