import {
    UserRepositoryStub,
    AuthenticationStub,
    unitOfWorkRepositoryStub,
    authenticationStub,
    userRepositoryStub
} from "../__mocks__";
import { UnauthorizedError, RefreshUserTokenUseCase, JsonWebTokenInvalidError } from "@/layers/application";

const makeSut = (): {
    sut: RefreshUserTokenUseCase,
    userRepositoryStub: UserRepositoryStub,
    authenticationStub: AuthenticationStub
} => {
    const sut = new RefreshUserTokenUseCase(unitOfWorkRepositoryStub, authenticationStub);

    return {
        sut,
        userRepositoryStub,
        authenticationStub
    };
};

describe("Use case - RefreshUserTokenUseCase", () => {
    test("Should throw error if refresh token is invalid", () => {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => {
                throw new JsonWebTokenInvalidError("Token is invalid");
            });

        const result = sut.execute({ refreshToken: "invalid-token" });

        expect(result).rejects.toThrow(JsonWebTokenInvalidError);
    });

    test("Should throw error if refresh token is not of the right type", () => {
        const { sut } = makeSut();

        const result = sut.execute({ refreshToken: "invalid-token" });

        expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub, authenticationStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(null);
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = sut.execute({ refreshToken: "valid-refresh-token" });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should return new access token on successful token refresh", async () => {
        const { sut, authenticationStub } = makeSut();
        jest
            .spyOn(authenticationStub, "verifyJsonWebToken")
            .mockImplementationOnce(() => ({
                id: "1",
                email: "email@test.com",
                type: "refresh_token"
            }));

        const result = await sut.execute({ refreshToken: "valid-refresh-token" });

        expect(result).toBe("token");
    });
});