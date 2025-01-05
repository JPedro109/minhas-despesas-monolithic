jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

describe("/api/extracts/expired - DELETE", () => {

    setup();

    test("Should delete expired extracts successfully", async () => {
        const response = await request(setupServer())
            .delete("/api/extracts/expired")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send();

        expect(response.statusCode).toBe(204);
    });
});