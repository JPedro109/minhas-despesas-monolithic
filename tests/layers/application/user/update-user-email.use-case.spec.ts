import {
    InvalidParamError,
    UpdateUserEmailUseCase,
} from "@/layers/application";
import {
    UserVerificationCodeRepositoryStub,
    UserRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testUserVerificationCodeEntityOfTypeRecoveryUserPassword,
    testUserVerificationCodeEntityOfTypeUpdateUserEmail,
    testUserVerificationCodeEntityOfTypeUpdateUserEmailWithDateExpired,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateUserEmailUseCase;
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub;
    userRepositoryStub: UserRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdateUserEmailUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userVerificationCodeRepositoryStub:
            unitOfWorkRepositoryStub.getUserVerificationCodeRepository(),
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
    };
};

describe("Use case - UpdateUserEmailUseCase", () => {
    test("Should not update email because the verification code is invalid", async () => {
        const { sut } = makeSut();
        const email = "newemail@test.com";
        const code = "123457";

        const result = sut.execute({
            email,
            code,
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code type is invalid", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        const email = "newemail@test.com";
        const code = "123458";
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockReturnValueOnce(
            Promise.resolve(
                testUserVerificationCodeEntityOfTypeRecoveryUserPassword(),
            ),
        );

        const result = sut.execute({
            email,
            code,
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code is expired", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        const email = "newemail@test.com";
        const code = "000000";
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockReturnValueOnce(
            Promise.resolve(
                testUserVerificationCodeEntityOfTypeUpdateUserEmailWithDateExpired(),
            ),
        );

        const result = sut.execute({
            email,
            code,
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update email successfully", async () => {
        const { sut, userVerificationCodeRepositoryStub, userRepositoryStub } =
            makeSut();
        const email = "newemail@test.com";
        const code = "123456";
        jest.spyOn(
            userVerificationCodeRepositoryStub,
            "getUserVerificationCodeByVerificationCode",
        ).mockReturnValueOnce(
            Promise.resolve(
                testUserVerificationCodeEntityOfTypeUpdateUserEmail(),
            ),
        );
        const updateUserVerificationCodeByIdSpy = jest.spyOn(
            userVerificationCodeRepositoryStub,
            "updateUserVerificationCodeById",
        );
        const updateUserByIdSpy = jest.spyOn(
            userRepositoryStub,
            "updateUserById",
        );

        await sut.execute({
            email,
            code,
        });

        expect(updateUserVerificationCodeByIdSpy).toHaveBeenCalled();
        expect(updateUserByIdSpy).toHaveBeenCalled();
    });
});
