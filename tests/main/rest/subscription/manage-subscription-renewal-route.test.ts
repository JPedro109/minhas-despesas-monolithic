jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (userId: string, renew: unknown): object => {
    return { userId, renew };
};

describe("/api/subscriptions/renew - POST", () => {
    setup();

    test("Should not manage subscription because field is invalid", async () => {
        const body = makeBody("", undefined);

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should manage subscription adding a new subscription with the same plan", async () => {
        const body = makeBody("00000000-0000-0000-0000-000000000004", true);

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send(body);

        expect(response.statusCode).toBe(204);
    });

    test("Should manage subscription adding a new subscription with plan free", async () => {
        const body = makeBody("00000000-0000-0000-0000-000000000004", false);

        const response = await request(setupServer())
            .post("/api/subscriptions/renew")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", "Basic dXNlcjpwYXNz")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
