import { UnauthorizedError } from "@/layers/application";
import { AuthenticateUserMiddleware } from "@/layers/presentation";
import { SecurityStub } from "../__mocks__";

const makeSut = (): {
    sut: AuthenticateUserMiddleware;
    securityStub: SecurityStub;
} => {
    const securityStub = new SecurityStub();
    const sut = new AuthenticateUserMiddleware(securityStub);

    return {
        sut,
        securityStub,
    };
};

describe("Presentation - AuthenticateUserMiddleware", () => {
    test("Should not authenticate user, because token is empty", async () => {
        const authorization = "";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because Bearer is invalid ", async () => {
        const authorization = "B token";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because token is invalid", async () => {
        const authorization = "Bearer invalid_token";
        const { sut, securityStub } = makeSut();
        jest.spyOn(securityStub, "verifyJsonWebToken").mockImplementationOnce(
            () => {
                throw new UnauthorizedError("Error");
            },
        );

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(401);
    });

    test("Should authenticate user", async () => {
        const authorization = "Bearer token";
        const { sut } = makeSut();

        const result = await sut.http({
            headers: {
                authorization,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
