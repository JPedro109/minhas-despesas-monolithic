import { DomainError } from "@/layers/domain";
import { CreateExpenseUseCase } from "@/layers/application";
import { unitOfWorkRepositoryStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: CreateExpenseUseCase
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new CreateExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut
    };
};

describe("Use case - CreateExpenseUseCase", () => {

    test("Should not create expense because the user rules are not respected", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const expenseName = "";
        const expenseValue = -100;
        const dueDate = new Date("2000-01-01");

        const result = sut.execute({
            userId,
            expenseName,
            expenseValue,
            dueDate
        });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should create expense successfully", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const expenseName = "Expense";
        const expenseValue = 100;    
        const dueDate = new Date("3000-01-01");

        const result = await sut.execute({
            userId,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).toBe("1");
    });
});