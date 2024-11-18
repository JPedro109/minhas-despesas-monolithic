import { GetUserExpensesUseCase, NotFoundError } from "@/layers/application";
import {
    UserRepositoryStub,
    unitOfWorkRepositoryStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserExpensesUseCase,
    userRepositoryStub: UserRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetUserExpensesUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository()
    };
};

describe("Use case - GetUserExpensesUseCase", () => {

    test("Should not return user expenses because user is not exists", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "2";
        jest
            .spyOn(userRepositoryStub, "getUserById")
            .mockResolvedValueOnce(null);

        const result = sut.execute({ userId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should return user expenses successfully", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.execute({ userId });

        expect(result[0].expenseId).not.toBeUndefined();
        expect(result[0].expenseName).not.toBeUndefined();
        expect(result[0].expenseValue).not.toBeUndefined();
        expect(result[0].dueDate).not.toBeUndefined();
        expect(result[0].paid).not.toBeUndefined();
        expect(result[0].userId).not.toBeUndefined();
    });
});