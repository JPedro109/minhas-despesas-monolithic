import {
    UserVerificationCodeRepositoryStub,
    testVerifyEmailTestUserVerificationCodeEntityWhoseUserEmailIsNotVerified,
    testRecoveryUserPasswordTestUserVerificationCodeEntity,
    unitOfWorkRepositoryStub,
    userVerificationCodeRepositoryStub
} from "../__mocks__";
import {
    VerifyUserEmailUseCase,
    InvalidParamError
} from "@/layers/application";

const makeSut = (): {
    sut: VerifyUserEmailUseCase,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub
} => {
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
            .mockResolvedValueOnce(testRecoveryUserPasswordTestUserVerificationCodeEntity);

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should verify user email and return user email", async () => {
        const code = "123456";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(testVerifyEmailTestUserVerificationCodeEntityWhoseUserEmailIsNotVerified);

        const result = await sut.execute({ code });

        expect(result).toBe("emailnotverified@teste.com");
    });
});