jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

describe("/api/subscriptions/charge-expired - POST", () => {
    setup();

    test("Should execute charge to expired subscriptions successfully", async () => {
        const response = await request(setupServer())
            .post("/api/subscriptions/charge-expired")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send();

        expect(response.statusCode).toBe(204);
    });
});
