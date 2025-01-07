jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (email: unknown, password: unknown): object => {
    return { email, password };
};

describe("/api/users/login - POST", () => {
    setup();

    test("Should not login because user does not exist", async () => {
        const body = makeBody("nonexistent-email@example.com", "Password1234");

        const response = await request(setupServer())
            .post("/api/users/login")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UnauthorizedError");
    });

    test("Should not login because email is not verified", async () => {
        const body = makeBody(
            "email-with-plan-free-and-with-email-not-verified@test.com",
            "Password1234",
        );

        const response = await request(setupServer())
            .post("/api/users/login")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UnauthorizedError");
    });

    test("Should not login because password is incorrect", async () => {
        const body = makeBody(
            "email-with-plan-free@test.com",
            "Password123456",
        );

        const response = await request(setupServer())
            .post("/api/users/login")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(401);
        expect(response.body.code).toBe("UnauthorizedError");
    });

    test("Should login successfully and return tokens", async () => {
        const body = makeBody("email-with-plan-free@test.com", "Password1234");

        const response = await request(setupServer())
            .post("/api/users/login")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("accessToken");
        expect(response.body).toHaveProperty("refreshToken");
    });
});
