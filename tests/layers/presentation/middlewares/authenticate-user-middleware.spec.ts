import { UnauthorizedError } from "@/layers/application";
import { AuthenticateUserMiddleware } from "@/layers/presentation";
import { AuthenticationStub } from "../__mocks__";

const makeSut = (): {
    sut: AuthenticateUserMiddleware
    authenticationStub: AuthenticationStub
} => {
    const authenticationStub = new AuthenticationStub();
    const sut = new AuthenticateUserMiddleware(authenticationStub);

    return {
        sut,
        authenticationStub
    };
};

describe("Presentation - AuthenticateUserMiddleware", () => {

    test("Should not authenticate user, because token is empty", async () => {
        const authorization = "";
        const { sut } = makeSut();

        const result = await sut.http(
            {
                headers: {
                    authorization
                }
            }
        );

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because Bearer is invalid ", async () => {
        const authorization = "B token";
        const { sut } = makeSut();

        const result = await sut.http(
            {
                headers: {
                    authorization
                }
            }
        );

        expect(result.statusCode).toBe(401);
    });

    test("Should not authenticate user, because token is invalid", async () => {
        const authorization = "Bearer invalid_token";
        const { sut, authenticationStub } = makeSut();
        jest.spyOn(authenticationStub, "verifyJsonWebToken").mockImplementationOnce(() => { throw new UnauthorizedError("Error"); });

        const result = await sut.http(
            {
                headers: {
                    authorization
                }
            }
        );

        expect(result.statusCode).toBe(401);
    });

    test("Should authenticate user", async () => {
        const authorization = "Bearer token";
        const { sut } = makeSut();

        const result = await sut.http(
            {
                headers: {
                    authorization
                }
            }
        );

        expect(result.statusCode).toBe(204);
    });
});