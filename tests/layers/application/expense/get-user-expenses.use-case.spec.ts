import { GetUserExpensesUseCase } from "@/layers/application";
import {
    unitOfWorkRepositoryStubFactory
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserExpensesUseCase,
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetUserExpensesUseCase(unitOfWorkRepositoryStub);

    return {
        sut
    };
};

describe("Use case - GetUserExpensesUseCase", () => {

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