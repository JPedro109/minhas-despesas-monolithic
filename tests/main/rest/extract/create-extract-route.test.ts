jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (referenceMonth: unknown, referenceYear: unknown): object => {
    return { referenceMonth, referenceYear };
};

describe("/api/extracts - POST", () => {
    setup();

    test("Should not create extract because are fields invalid", async () => {
        const body = makeBody("", "");
        const token = await loginRest(
            "email-with-plan-gold-and-with-expense@test.com",
        );

        const response = await request(setupServer())
            .post("/api/extracts")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not create extract because the user already has the maximum number of extracts", async () => {
        const body = makeBody(1, 3000);
        const token = await loginRest(
            "email-with-plan-gold-and-with-expenses-and-extracts@test.com",
        );

        const response = await request(setupServer())
            .post("/api/extracts")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(403);
        expect(response.body.code).toBe("ForbiddenError");
    });

    test("Should not create extract because is not exists payment histories in reference", async () => {
        const body = makeBody(12, 2000);
        const token = await loginRest(
            "email-with-plan-gold-and-with-expense@test.com",
        );

        const response = await request(setupServer())
            .post("/api/extracts")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should create an extract successfully", async () => {
        const body = makeBody(1, 3000);
        const token = await loginRest(
            "email-with-plan-gold-and-with-expense@test.com",
        );

        const response = await request(setupServer())
            .post("/api/extracts")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(201);
    });
});
