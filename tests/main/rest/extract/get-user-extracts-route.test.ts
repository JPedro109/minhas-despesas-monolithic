jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

describe("/api/extracts - GET", () => {
    setup();

    test("Should return a list of extracts successfully", async () => {
        const token = await loginRest(
            "email-verified-with-exclude-payment-method-and-sub-with-full@test.com",
        );

        const response = await request(setupServer())
            .get("/api/extracts")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`);

        expect(response.statusCode).toBe(200);
    });
});
