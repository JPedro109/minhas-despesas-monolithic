jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/expenses/undo-payment/:id - PATCH", () => {

    setup();

    const makeUrl = (id: string): string => `/api/expenses/undo-payment/${id}`;

    test("Should not undo payment because the expense does not exist", async () => {
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("ffffffff-ffff-ffff-ffff-ffffffffffff"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should undo payment", async () => {
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .patch(makeUrl("00000000-0000-0000-0000-000000000000"))
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send();

        expect(response.statusCode).toBe(204);
    });
});