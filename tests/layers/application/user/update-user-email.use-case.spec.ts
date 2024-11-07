import {
    paymentStub,
    testRecoveryUserPasswordTestUserVerificationCodeEntity,
    unitOfWorkRepositoryStub,
    testUpdateUserEmailTestUserVerificationCodeEntity,
    testUpdateUserEmailTestUserVerificationCodeEntityWithDateExpired,
    userVerificationCodeRepositoryStub,
    UserVerificationCodeRepositoryStub
} from "../__mocks__";
import {
    InvalidParamError,
    UpdateUserEmailUseCase,
} from "@/layers/application";

const makeSut = (): {
    sut: UpdateUserEmailUseCase,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub,
} => {
    const sut = new UpdateUserEmailUseCase(unitOfWorkRepositoryStub, paymentStub);

    return {
        sut,
        userVerificationCodeRepositoryStub
    };
};

describe("Use case - UpdateUserEmailUseCase", () => {
    test("Should not update email because the verification code is invalid", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            email: "newemail@test.com",
            code: "123457",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code type is invalid", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testRecoveryUserPasswordTestUserVerificationCodeEntity));

        const result = sut.execute({
            email: "newemail@test.com",
            code: "123458",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code is expired", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUpdateUserEmailTestUserVerificationCodeEntityWithDateExpired));

        const result = sut.execute({
            email: "newemail@test.com",
            code: "000000",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update email successfully", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUpdateUserEmailTestUserVerificationCodeEntity));

        const result = await sut.execute({
            email: "newemail@test.com",
            code: "123456",
        });

        expect(result).toBe("newemail@test.com");
    });
});