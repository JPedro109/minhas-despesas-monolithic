import {
    VerifyUserEmailUseCase,
    InvalidParamError,
} from "@/layers/application";
import {
    UserVerificationCodeRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testUserVerificationCodeEntityOfTypeVerifyEmail,
    testUserVerificationCodeEntityOfTypeUpdateUserEmail,
    UserRepositoryStub,
} from "../__mocks__";

const makeSut = (): {
    sut: VerifyUserEmailUseCase;
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub;
    userRepository: UserRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new VerifyUserEmailUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userVerificationCodeRepositoryStub:
            unitOfWorkRepositoryStub.getUserVerificationCodeRepository(),
        userRepository: unitOfWorkRepositoryStub.getUserRepository(),
    };
};

describe("Use case - VerifyUserEmailUseCase", () => {
    test("Should throw error if verification code is invalid", async () => {
        const code = "123457";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should throw error if verification code type is invalid", async () => {
        const code = "123458";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockResolvedValueOnce(
            testUserVerificationCodeEntityOfTypeUpdateUserEmail(),
        );

        const result = sut.execute({ code });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should verify user email and return user email", async () => {
        const code = "123456";
        const { sut, userVerificationCodeRepositoryStub, userRepository } =
            makeSut();
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockResolvedValueOnce(
            testUserVerificationCodeEntityOfTypeVerifyEmail(),
        );
        const updateUserVerificationCodeByIdSpy = jest.spyOn(
            userVerificationCodeRepositoryStub,
            "updateUserVerificationCodeById",
        );
        const updateUserByIdSpy = jest.spyOn(userRepository, "updateUserById");

        await sut.execute({ code });

        expect(updateUserVerificationCodeByIdSpy).toHaveBeenCalled();
        expect(updateUserByIdSpy).toHaveBeenCalled();
    });
});
