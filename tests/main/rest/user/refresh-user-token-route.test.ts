jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup, loginRest } from "../../__mocks__";
import request from "supertest";

const makeBody = (refreshToken: unknown): object => {
    return { refreshToken };
};

describe("/api/users/refresh-token - POST", () => {
    setup();

    test("Should not refresh token because refreshToken is missing", async () => {
        const body = makeBody("");

        const response = await request(setupServer())
            .post("/api/users/refresh-token")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not refresh token because refreshToken is invalid", async () => {
        const body = makeBody("invalid-refresh-token");

        const response = await request(setupServer())
            .post("/api/users/refresh-token")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("InvalidJsonWebTokenError");
    });

    test("Should not refresh token because type of refreshToken is invalid", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const refreshToken = token.accessToken;
        const body = makeBody(refreshToken);

        const response = await request(setupServer())
            .post("/api/users/refresh-token")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UnauthorizedError");
    });

    test("Should refresh token successfully", async () => {
        const token = await loginRest(
            "email-verified-with-valid-codes@test.com",
        );
        const refreshToken = token.refreshToken;
        const body = makeBody(refreshToken);

        const response = await request(setupServer())
            .post("/api/users/refresh-token")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(200);
    });
});
