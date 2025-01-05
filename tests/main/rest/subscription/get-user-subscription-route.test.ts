jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/subscriptions - GET", () => {

    setup();

    test("Should return the subscription user successfully", async () => {
        const token = await loginRest("email-with-plan-gold-and-with-expenses-and-extracts@test.com");

        const response = await request(setupServer())
            .get("/api/subscriptions")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(200);
    });
});