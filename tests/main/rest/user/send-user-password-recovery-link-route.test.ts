jest.setTimeout(10000);

import { setupServer } from "@/main/setup-server";
import { setup } from "../../__mocks__";
import request from "supertest";

const makeBody = (email: unknown): object => {
    return { email };
};

describe("/api/user/send-password-recovery-link - POST", () => {
    setup();

    test("Should not send password recovery link because email is missing", async () => {
        const body = makeBody("");

        const response = await request(setupServer())
            .post("/api/users/send-password-recovery-link")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.body.code).toBe("InvalidRequestSchemaError");
    });

    test("Should not send password recovery link because email is not registered", async () => {
        const body = makeBody("nonexistent@example.com");

        const response = await request(setupServer())
            .post("/api/users/send-password-recovery-link")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(404);
        expect(response.body.code).toBe("NotFoundError");
    });

    test("Should send password recovery link successfully", async () => {
        const body = makeBody("email-with-plan-free@test.com");

        const response = await request(setupServer())
            .post("/api/users/send-password-recovery-link")
            .set("User-Agent", "Supertest-Client/1.0")
            .send(body);

        expect(response.statusCode).toBe(204);
    });
});
