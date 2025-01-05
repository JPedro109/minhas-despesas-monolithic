jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

describe("/api/expenses/update-unpaid - POST", () => {

    setup();

    test("Should update previous month paid expenses to unpaid successfully", async () => {
        const response = await request(setupServer())
            .post("/api/expenses/update-unpaid")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send();

        expect(response.statusCode).toBe(204);
    });
});