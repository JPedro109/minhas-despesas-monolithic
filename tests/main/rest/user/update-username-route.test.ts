jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { loginRest, setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (username: unknown): object => {
    return { username };
};

describe("/api/users/username - PATCH", () => {
    setup();

    test("Should not update username because username is empty", async () => {
        const token = await loginRest("email-with-plan-gold@test.com");
        const body = makeBody("");

        const response = await request(setupServer())
            .patch("/api/users/username")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should update username successfully", async () => {
        const token = await loginRest("email-with-plan-gold@test.com");
        const body = makeBody("New Username");

        const response = await request(setupServer())
            .patch("/api/users/username")
            .set("User-Agent", "Supertest-Client/1.0")
            .set("authorization", `Bearer ${token.accessToken}`)
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
