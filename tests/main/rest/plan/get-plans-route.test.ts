jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/plans - GET", () => {

    setup();

    test("Should return a list of plans successfully", async () => {
        const token = await loginRest("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .get("/api/plans")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(200);
    });
});