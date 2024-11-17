import {
    NotFoundError,
    UpdateUsernameUseCase
} from "@/layers/application";
import {
    UserRepositoryStub,
    unitOfWorkRepositoryStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateUsernameUseCase,
    userRepositoryStub: UserRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdateUsernameUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository()
    };
};

describe("Use case - UpdateUsernameUseCase", () => {
    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id: "2",
            username: "new-username"
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should update username successfully", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            id: "1",
            username: "new-username"
        });

        expect(result).toBe("email@teste.com");
    });
});