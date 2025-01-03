jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (code: unknown): object => {
    return { code };
};

describe("/api/users/verify-email - PATCH", () => {

    setup();

    test("Should not verify email because the code is invalid", async () => {
        const body = makeBody("999999");

        const response = await request(setupServer())
            .patch("/api/users/verify-email")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not verify email because the code type is incorrect", async () => {
        const body = makeBody("000007");

        const response = await request(setupServer())
            .patch("/api/users/verify-email")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidParamError");
    });

    test("Should not verify email because email already verified", async () => {
        const body = makeBody("000000");

        const response = await request(setupServer())
            .patch("/api/users/verify-email")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(422);
        expect(response.body.code).toBe("DomainError");
    });

    test("Should verify email successfully", async () => {
        const body = makeBody("000006");

        const response = await request(setupServer())
            .patch("/api/users/verify-email")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});