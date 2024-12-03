import { UnauthorizedError, RefreshUserTokenUseCase, InvalidJsonWebTokenError } from "@/layers/application";
import {
    UserRepositoryStub,
    SecurityStub,
    unitOfWorkRepositoryStubFactory,
    securityStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: RefreshUserTokenUseCase,
    userRepositoryStub: UserRepositoryStub,
    authenticationStub: SecurityStub
} => {
    const authenticationStub = securityStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new RefreshUserTokenUseCase(unitOfWorkRepositoryStub, authenticationStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        authenticationStub
    };
};

describe("Use case - RefreshUserTokenUseCase", () => {
    test("Should throw error if refresh token is invalid", () => {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => {
                throw new InvalidJsonWebTokenError("Token is invalid");
            });

        const result = sut.execute({ refreshToken: "invalid-token" });

        expect(result).rejects.toThrow(InvalidJsonWebTokenError);
    });

    test("Should throw error if refresh token is not of the right type", async () => {
        const { sut } = makeSut();
        const invalidToken = "invalid-token";

        const result = sut.execute({ refreshToken: invalidToken });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub, authenticationStub } = makeSut();
        const refreshToken = "valid-refresh-token";
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = sut.execute({ refreshToken });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should return new access token on successful token refresh", async () => {
        const { sut, authenticationStub } = makeSut();
        const  refreshToken = "valid-refresh-token";
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = await sut.execute({ refreshToken });

        expect(typeof result).toBe("string");
    });
});