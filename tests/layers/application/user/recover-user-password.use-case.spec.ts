import { InvalidParamError, RecoverUserPasswordUseCase } from "@/layers/application";
import {
    CryptographyStub,
    UserVerificationCodeRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    cryptographyStubFactory,
    testUserVerificationCodeEntityOfTypeRecoveryUserPassword,
    testUserVerificationCodeEntityOfTypeRecoveryUserPasswordWithDateExpired,
    testUserVerificationCodeEntityOfTypeUpdateUserEmail
} from "../__mocks__";

const makeSut = (): {
    sut: RecoverUserPasswordUseCase,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const cryptographyStub = cryptographyStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new RecoverUserPasswordUseCase(unitOfWorkRepositoryStub, cryptographyStub);

    return {
        sut,
        userVerificationCodeRepositoryStub: unitOfWorkRepositoryStub.getUserVerificationCodeRepository(),
        cryptographyStub
    };
};

describe("Use case - RecoverUserPasswordUseCase", () => {

    test("Should not recover password because passwords do not match", async () => {
        const code = "123456";
        const password = "NewPassword123";
        const invalidPasswordConfirm = "DifferentPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityOfTypeRecoveryUserPassword()));

        const result = sut.execute({
            code,
            password,
            passwordConfirm: invalidPasswordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because verification code is invalid", async () => {
        const code = "123457";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut } = makeSut();

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because verification code type is invalid", async () => {
        const code = "123458";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityOfTypeUpdateUserEmail()));

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because verification code is expired", async () => {
        const code = "000000";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityOfTypeRecoveryUserPasswordWithDateExpired()));

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because new password is equal to the old password", async () => {
        const code = "123456";
        const password = "OldPassword123";
        const passwordConfirm = "OldPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityOfTypeRecoveryUserPassword()));

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should recover password successfully", async () => {
        const code = "123456";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, cryptographyStub, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(cryptographyStub, "compareHash")
            .mockReturnValueOnce(Promise.resolve(false));
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityOfTypeRecoveryUserPassword()));

        const result = await sut.execute({
            code,
            password,
            passwordConfirm
        });

        expect(result).toBe("email@teste.com");
    });
});