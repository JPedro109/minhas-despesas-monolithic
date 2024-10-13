import {
    generationStub,
    mailStub,
    unitOfWorkRepositoryStub,
    userRepositoryStub,
    UserRepositoryStub
} from "../__mocks__";
import {
    ConflictedError,
    NotFoundError,
    SendUserEmailUpdateLinkUseCase
} from "@/layers/application";

const makeSut = (): {
    sut: SendUserEmailUpdateLinkUseCase,
    userRepositoryStub: UserRepositoryStub
} => {
    const sut = new SendUserEmailUpdateLinkUseCase(
        unitOfWorkRepositoryStub,
        mailStub,
        generationStub
    );

    return {
        sut,
        userRepositoryStub
    };
};

describe("Use case - SendUserEmailUpdateLinkUseCase", () => {
    test("Should not send email update link because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id: "2",
            email: "newemail@test.com",
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not send email update link because email is already registered", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            id: "1",
            email: "existingemail@test.com",
        });

        await expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should send email update link successfully", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockReturnValueOnce(null);

        const result = await sut.execute({
            id: "1",
            email: "newemail@test.com",
        });

        expect(result).toBe("email@teste.com");
    });
});