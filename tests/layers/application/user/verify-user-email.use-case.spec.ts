import {
    VerifyUserEmailUseCase,
    InvalidParamError
} from "@/layers/application";
import {
    UserVerificationCodeRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testUserVerificationCodeEntityOfTypeVerifyEmail,
    testUserVerificationCodeEntityOfTypeUpdateUserEmail
} from "../__mocks__";

const makeSut = (): {
    sut: VerifyUserEmailUseCase,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new VerifyUserEmailUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userVerificationCodeRepositoryStub: unitOfWorkRepositoryStub.getUserVerificationCodeRepository()
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
            .mockResolvedValueOnce(testUserVerificationCodeEntityOfTypeUpdateUserEmail());

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should verify user email and return user email", async () => {
        const code = "123456";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockResolvedValueOnce(testUserVerificationCodeEntityOfTypeVerifyEmail());

        const result = await sut.execute({ code });

        expect(result).toBe("emailnotverified@teste.com");
    });
});