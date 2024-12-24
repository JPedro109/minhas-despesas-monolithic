jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";

import { setup } from "../../__mocks__";

import request from "supertest";

const makeBodyCreateUser = (
    email: unknown,
    username: unknown,
    password: unknown,
    passwordConfirm: unknown,
    consentVersion: unknown,
): object => {
    return {
        email,
        username,
        password,
        passwordConfirm,
        consentVersion,
    };
};

describe("/api/users - POST", () => {
    setup();
    const server = setupServer();
    
    test("Should not create user, because fields are emptys", async () => {
        const body = makeBodyCreateUser(
            "",
            "",
            "",
            "",
            ""
        );

        const response = await request(server)
            .post("/api/users")
            .send(body)
            .set("User-Agent", "Supertest-Client/1.0");;

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not create user, because passwords do not match", async () => {
        const body = makeBodyCreateUser(
            "email@test.com",
            "username",
            "Password1234",
            "Password5678",
            "1.0"
        );

        const response = await request(server)
            .post("/api/users")
            .send(body)
            .set("User-Agent", "Supertest-Client/1.0");

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not create user, because email is already registered", async () => {
        const body = makeBodyCreateUser(
            "email-with-plan-free@test.com",
            "username",
            "Password1234",
            "Password1234",
            "1.0"
        );

        const response = await request(server)
            .post("/api/users")
            .send(body)
            .set("User-Agent", "Supertest-Client/1.0");;

        expect(response.statusCode).toBe(409);
        expect(response.body.code).toBe("ConflictedError");
    });

    test("Should not create user, because password is too weak", async () => {
        const body = makeBodyCreateUser(
            "email@test.com",
            "username",
            "123",
            "123",
            "1.0"
        );

        const response = await request(server)
            .post("/api/users")
            .send(body)
            .set("User-Agent", "Supertest-Client/1.0");;

        expect(response.statusCode).toBe(422);
        expect(response.body.code).toBe("DomainError");
    });

    test("Should create user with valid data", async () => {
        const body = makeBodyCreateUser(
            "new_email@test.com",
            "username",
            "Password1234",
            "Password1234",
            "1.0"
        );

        const response = await request(server)
            .post("/api/users")
            .send(body)
            .set("User-Agent", "Supertest-Client/1.0");;

        expect(response.statusCode).toBe(201);
    });
});