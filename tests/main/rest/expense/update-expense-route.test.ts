jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (
    expenseName: string,
    expenseValue: number,
    dueDate: string,
): object => {
    return { expenseName, expenseValue, dueDate };
};

describe("/api/expenses/:id - PUT", () => {
    setup();

    const makeUrl = (id: string): string => `/api/expenses/${id}`;

    test("Should not update expense because the are fields invalid", async () => {
        const body = makeBody("", undefined, "");
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .put(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not update expense because the expense does not exist", async () => {
        const body = makeBody("Updated Expense Name", 150, "3000-12-31");
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .put(makeUrl("ffffffff-ffff-ffff-ffff-ffffffffffff"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should successfully update an expense", async () => {
        const body = makeBody("Updated Expense Name", 150, "3000-12-31");
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .put(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
