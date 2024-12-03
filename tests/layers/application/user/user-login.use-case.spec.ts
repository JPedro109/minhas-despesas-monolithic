import { UnauthorizedError, UserLoginUseCase } from "@/layers/application";
import {
    UserRepositoryStub,
    CryptographyStub,
    testUserEntityWithEmailIsNotVerified,
    unitOfWorkRepositoryStubFactory,
    cryptographyStubFactory,
    securityStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: UserLoginUseCase,
    userRepositoryStub: UserRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const cryptographyStub = cryptographyStubFactory();
    const authenticationStub = securityStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UserLoginUseCase(unitOfWorkRepositoryStub, cryptographyStub, authenticationStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        cryptographyStub
    };
};

describe("Use case - UserLoginUseCase", () => {
    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const email = "nonexistent@test.com";
        const password = "password";
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(null);

        const result = sut.execute({ email, password });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if user's email is not verified", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const email = "user@test.com";
        const password = "password";
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(testUserEntityWithEmailIsNotVerified());

        const result = sut.execute({ email, password });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if password does not match", async () => {
        const { sut, cryptographyStub } = makeSut();
        const email = "user@test.com"; 
        const password = "wrong-password";
        jest.spyOn(cryptographyStub, "compareHash").mockResolvedValueOnce(false);

        const result = sut.execute({ email, password });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should return access token and refresh token on successful login", async () => {
        const { sut } = makeSut();
        const email = "user@test.com";
        const password = "Password1234";

        const result = await sut.execute({ email, password });

        expect(result).toEqual({
            accessToken: "token",
            refreshToken: "token"
        });
    });
});