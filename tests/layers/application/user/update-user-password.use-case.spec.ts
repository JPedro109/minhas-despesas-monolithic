import {
    UserRepositoryStub,
    CryptographyStub,
    unitOfWorkRepositoryStub,
    cryptographyStub,
    userRepositoryStub
} from "../__mocks__";
import {
    InvalidParamError,
    NotFoundError,
    UpdateUserPasswordUseCase
} from "@/layers/application";

const makeSut = (): {
    sut: UpdateUserPasswordUseCase,
    userRepositoryStub: UserRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const sut = new UpdateUserPasswordUseCase(unitOfWorkRepositoryStub, cryptographyStub);

    return {
        sut,
        userRepositoryStub,
        cryptographyStub
    };
};

describe("Use case - UpdateUserPasswordUseCase", () => {
    test("Should throw error if new passwords do not match", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            id: "1",
            password: "old-password",
            newPassword: "NewPassword123",
            newPasswordConfirm: "different-NewPassword123"
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id: "2",
            password: "old-password",
            newPassword: "NewPassword123",
            newPasswordConfirm: "NewPassword123"
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should throw error if new password is equal to the old password", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            id: "1",
            password: "old-password",
            newPassword: "old-password",
            newPasswordConfirm: "old-password"
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update password successfully", async () => {
        const { sut, cryptographyStub } = makeSut();
        jest.spyOn(cryptographyStub, "compareHash").mockResolvedValueOnce(false); 

        const result = await sut.execute({
            id: "1",
            password: "Password1234",
            newPassword: "NewPassword123",
            newPasswordConfirm: "NewPassword123"
        });

        expect(result).toBe("email@teste.com");
    });
});