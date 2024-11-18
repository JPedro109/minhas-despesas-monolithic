import {
    InvalidParamError,
    NotFoundError,
    UpdateUserPasswordUseCase
} from "@/layers/application";
import {
    UserRepositoryStub,
    CryptographyStub,
    unitOfWorkRepositoryStubFactory,
    cryptographyStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateUserPasswordUseCase,
    userRepositoryStub: UserRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const cryptographyStub = cryptographyStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdateUserPasswordUseCase(unitOfWorkRepositoryStub, cryptographyStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        cryptographyStub
    };
};

describe("Use case - UpdateUserPasswordUseCase", () => {
    test("Should throw error if new passwords do not match", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "old-password";
        const newPassword = "NewPassword123";
        const newPasswordConfirm = "different-NewPassword123";

        const result = sut.execute({
            id,
            password,
            newPassword,
            newPasswordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const id = "2";
        const password = "old-password";
        const newPassword = "NewPassword123";
        const newPasswordConfirm = "NewPassword123";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id,
            password,
            newPassword,
            newPasswordConfirm
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should throw error if new password is equal to the old password", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "old-password";
        const newPassword = "old-password";
        const newPasswordConfirm = "old-password";

        const result = sut.execute({
            id,
            password,
            newPassword,
            newPasswordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update password successfully", async () => {
        const { sut, cryptographyStub, userRepositoryStub } = makeSut();
        const id = "1";
        const password = "Password1234";
        const newPassword = "NewPassword123";
        const newPasswordConfirm = "NewPassword123";
        jest.spyOn(cryptographyStub, "compareHash").mockResolvedValueOnce(false); 
        const updateUserByIdSpy = jest.spyOn(userRepositoryStub, "updateUserById");

        await sut.execute({
            id,
            password,
            newPassword,
            newPasswordConfirm
        });

        expect(updateUserByIdSpy).toHaveBeenCalled();
    });
});