import {
    UnitOfWorkRepositoryStub,
    UserRepositoryStub,
    SubscriptionRepositoryStub,
    PlanRepositoryStub,
    UserConsentRepositoryStub,
    UserVerificationCodeRepositoryStub,
    CustomerRepositoryStub,
    verifyEmailTestUserVerificationCodeEntityWhoseUserEmailIsNotVerified,
    verifyEmailTestUserVerificationCodeEntityWithDateExpiredAndWhoseUserEmailIsNotVerified,
    recoveryUserPasswordTestUserVerificationCodeEntity
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
        const code = "123457";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest.spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode").mockResolvedValueOnce(null);

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should throw error if verification code type is invalid", async () => {
        const code = "123458";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(recoveryUserPasswordTestUserVerificationCodeEntity);

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });


    test("Should throw error if verification code is expired", async () => {
        const code = "000000";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(verifyEmailTestUserVerificationCodeEntityWithDateExpiredAndWhoseUserEmailIsNotVerified);

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should verify user email and return user email", async () => {
        const code = "123456";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(verifyEmailTestUserVerificationCodeEntityWhoseUserEmailIsNotVerified);

        const result = await sut.execute({ code });

        expect(result).toBe("emailnotverified@teste.com");
    });
});