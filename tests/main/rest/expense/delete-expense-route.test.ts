jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (deleteExpensePaymentHistory: unknown): object => {
    return { deleteExpensePaymentHistory };
};

describe("/api/expenses/:id - DELETE", () => {
    setup();

    const makeUrl = (id: string): string => `/api/expenses/${id}`;

    test("Should not delete expense because the expense does not exist", async () => {
        const body = makeBody("true");
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .delete(makeUrl("ffffffff-ffff-ffff-ffff-ffffffffffff"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should delete the expense and its payment history successfully", async () => {
        const body = makeBody("true");
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .delete(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });

    test("Should delete the expense without its payment history when flag is false", async () => {
        const body = makeBody("false");
        const token = await loginRest(
            "email-payment-method-and-inactive-sub-expenses@test.com",
        );

        const response = await request(setupServer())
            .delete(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
