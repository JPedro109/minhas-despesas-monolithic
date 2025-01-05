jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

describe("/api/subscriptions/set-free-plan - POST", () => {

    setup();

    test("Should set free plan for non renewable subscriptions successfully", async () => {
        const response = await request(setupServer())
            .post("/api/subscriptions/set-free-plan")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send();

        expect(response.statusCode).toBe(204);
    });
});