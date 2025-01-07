jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

describe("/api/expenses/notify-due - POST", () => {
    setup();

    test("Should send notification of expenses that are coming due successfully", async () => {
        const response = await request(setupServer())
            .post("/api/expenses/notify-due")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send();

        expect(response.statusCode).toBe(204);
    });
});
