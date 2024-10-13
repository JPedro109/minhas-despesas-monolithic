import {
    UnitOfWorkRepositoryStub,
    UserRepositoryStub,
    SubscriptionRepositoryStub,
    PlanRepositoryStub,
    CryptographyStub,
    UserConsentRepositoryStub,
    UserVerificationCodeRepositoryStub,
    CustomerRepositoryStub,
    AuthenticationStub,
    testUserEntityWithEmailIsNotVerified
} from "../__mocks__";
import { UnauthorizedError, UserLoginUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UserLoginUseCase,
    userRepositoryStub: UserRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const userRepositoryStub = new UserRepositoryStub();
    const userConsentRepositoryStub = new UserConsentRepositoryStub();
    const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
    const customerRepositoryStub = new CustomerRepositoryStub();
    const planRepositoryStub = new PlanRepositoryStub();
    const subscriptionRepositoryStub = new SubscriptionRepositoryStub();
    const unitOfWorkRepositoryStub = new UnitOfWorkRepositoryStub(
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
        customerRepositoryStub,
        planRepositoryStub,
        subscriptionRepositoryStub,
        userConsentRepositoryStub
    );
    const cryptographyStub = new CryptographyStub();
    const authenticationStub = new AuthenticationStub();
    const sut = new UserLoginUseCase(unitOfWorkRepositoryStub, cryptographyStub, authenticationStub);

    return {
        sut,
        userRepositoryStub,
        cryptographyStub
    };
};

describe("Use case - UserLoginUseCase", () => {
    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(null);

        const result = sut.execute({ email: "nonexistent@test.com", password: "password" });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if user's email is not verified", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockResolvedValueOnce(testUserEntityWithEmailIsNotVerified);

        const result = sut.execute({ email: "user@test.com", password: "password" });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should throw error if password does not match", async () => {
        const { sut, cryptographyStub } = makeSut();
        jest.spyOn(cryptographyStub, "compareHash").mockResolvedValueOnce(false);

        const result = sut.execute({ email: "user@test.com", password: "wrong-password" });

        await expect(result).rejects.toThrow(UnauthorizedError);
    });

    test("Should return access token and refresh token on successful login", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({ email: "user@test.com", password: "Password1234" });

        expect(result).toEqual({
            accessToken: "token",
            refreshToken: "token"
        });
    });
});