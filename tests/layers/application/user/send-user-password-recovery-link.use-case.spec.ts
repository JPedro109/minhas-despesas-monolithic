import {
    generationStub,
    mailStub,
    unitOfWorkRepositoryStub,
    userRepositoryStub,
    UserRepositoryStub
} from "../__mocks__";
import {
    NotFoundError,
    SendUserPasswordRecoveryLinkUseCase,
} from "@/layers/application";

const makeSut = (): {
    sut: SendUserPasswordRecoveryLinkUseCase,
    userRepositoryStub: UserRepositoryStub
} => {
    const sut = new SendUserPasswordRecoveryLinkUseCase(
        unitOfWorkRepositoryStub,
        mailStub,
        generationStub
    );

    return {
        sut,
        userRepositoryStub
    };
};

describe("Use case - SendUserPasswordRecoveryLinkUseCase", () => {
    test("Should not send password recovery link because email is not registered", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockReturnValueOnce(null);

        const result = sut.execute({
            email: "nonexistentemail@test.com",
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should send password recovery link successfully", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            email: "email@teste.com",
        });

        expect(result).toBe("email@teste.com");
    });
});