jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (expenseName: unknown, expenseValue: unknown, dueDate: unknown): object => {
    return { expenseName, expenseValue, dueDate };
};

describe("/api/expenses - POST", () => {

    setup();

    test("Should not create expense because fields are invalid", async () => {
        const body = makeBody("", "", "");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .post("/api/expenses")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not create expense because the user has reached the maximum number of expenses", async () => {
        const body = makeBody("Rent", 500, "3000-01-01");
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .post("/api/expenses")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(403);
        expect(response.body.code).toBe("ForbiddenError");
    });

    test("Should create an expense successfully", async () => {
        const body = makeBody("Rent", 500, "3000-01-01");
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .post("/api/expenses")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(201);
    });
});