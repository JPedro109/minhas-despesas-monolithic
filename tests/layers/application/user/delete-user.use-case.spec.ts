import { 
    UserRepositoryStub,
    CryptographyStub,
    cryptographyStub,
    paymentStub,
    unitOfWorkRepositoryStub,
    userRepositoryStub
} from "../__mocks__";
import { DeleteUserUseCase, InvalidParamError, NotFoundError } from "@/layers/application";

const makeSut = (): {
    sut: DeleteUserUseCase,
    userRepositoryStub: UserRepositoryStub,
    cryptographyStub: CryptographyStub
} => {
    const sut = new DeleteUserUseCase(unitOfWorkRepositoryStub, cryptographyStub, paymentStub);

    return {
        sut,
        userRepositoryStub,
        cryptographyStub
    };
};

describe("Use case - DeleteUserUseCase", () => {

    test("Should not delete user because passwords do not match", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "Password1234";
        const passwordConfirm = "Password12345";

        const result = sut.execute({
            id,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not delete user because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const id = "2";
        const password = "Password1234";
        const passwordConfirm = "Password1234";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({
            id,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not delete user because password is invalid", async () => {
        const { sut, cryptographyStub } = makeSut();
        const id = "1";
        const password = "InvalidPassword";
        const passwordConfirm = "InvalidPassword";
        jest.spyOn(cryptographyStub, "compareHash").mockReturnValueOnce(Promise.resolve(false));

        const result = sut.execute({
            id,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should delete user successfully", async () => {
        const { sut } = makeSut();
        const id = "1";
        const password = "Password1234";
        const passwordConfirm = "Password1234";

        const result = await sut.execute({
            id,
            password,
            passwordConfirm
        });

        expect(result).toBe(id);
    });
});