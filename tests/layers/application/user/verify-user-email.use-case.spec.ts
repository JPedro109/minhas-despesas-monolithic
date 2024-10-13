import {
    UnitOfWorkRepositoryStub,
    UserRepositoryStub,
    SubscriptionRepositoryStub,
    PlanRepositoryStub,
    UserConsentRepositoryStub,
    UserVerificationCodeRepositoryStub,
    CustomerRepositoryStub,
    testUserVerificationCodeEntityWhoseUserEmailIsNotVerified,
    testUserVerificationCodeEntityWithDateExpiredAndWhoseUserEmailIsNotVerified
} from "../__mocks__";
import {
    VerifyUserEmailUseCase,
    InvalidParamError
} from "@/layers/application";

const makeSut = (): {
    sut: VerifyUserEmailUseCase,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub
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
    const sut = new VerifyUserEmailUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userVerificationCodeRepositoryStub
    };
};

describe("Use case - VerifyUserEmailUseCase", () => {
    test("Should throw error if verification code is invalid", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest.spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode").mockResolvedValueOnce(null);

        const result = sut.execute({ code: "000000" });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should throw error if verification code is expired", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(testUserVerificationCodeEntityWithDateExpiredAndWhoseUserEmailIsNotVerified);

        const result = sut.execute({ code: "123457" });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should verify user email and return user email", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
        .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
        .mockResolvedValueOnce(testUserVerificationCodeEntityWhoseUserEmailIsNotVerified);

        const result = await sut.execute({ code: "123456" });

        expect(result).toBe("emailnotverified@teste.com");
    });
});