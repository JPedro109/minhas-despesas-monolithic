import { NotFoundError, UpdateUsernameUseCase } from "@/layers/application";
import {
    UserRepositoryStub,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateUsernameUseCase;
    userRepositoryStub: UserRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdateUsernameUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
    };
};

describe("Use case - UpdateUsernameUseCase", () => {
    test("Should throw error if user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const id = "2";
        const username = "new-username";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id,
            username,
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should update username successfully", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const id = "1";
        const username = "new-username";
        const updateUserByIdSpy = jest.spyOn(
            userRepositoryStub,
            "updateUserById",
        );

        await sut.execute({
            id,
            username,
        });

        expect(updateUserByIdSpy).toHaveBeenCalled();
    });
});
