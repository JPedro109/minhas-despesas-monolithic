import {
    unitOfWorkRepositoryStub,
    expenseRepositoryStub
} from "../__mocks__";
import { InvalidExpenseDueDateError, InvalidExpenseNameError, InvalidExpenseValueError } from "@/layers/domain";
import { NotFoundError, UpdateExpenseUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UpdateExpenseUseCase,
    expenseRepositoryStub: typeof expenseRepositoryStub
} => {
    const sut = new UpdateExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub
    };
};

describe("Use case - UpdateExpenseUseCase", () => {

    test("Should not update expense because expense name is invalid", async () => {
        const { sut } = makeSut();
        const id = "1";
        const expenseName = "";
        const expenseValue = 500;
        const dueDate = new Date("3000-01-01");

        const result = sut.execute({
            id,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).rejects.toThrow(InvalidExpenseNameError);
    });

    test("Should not update expense because expense value is invalid", async () => {
        const { sut } = makeSut();
        const id = "1";
        const expenseName = "Updated Expense Name";
        const expenseValue = -100;
        const dueDate = new Date("3000-01-01");

        const result = sut.execute({
            id,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).rejects.toThrow(InvalidExpenseValueError);
    });

    test("Should not update expense because due date is invalid", async () => {
        const { sut } = makeSut();
        const id = "1";
        const expenseName = "Updated Expense Name";
        const expenseValue = 100;
        const dueDate = new Date("2000-01-01");

        const result = sut.execute({
            id,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).rejects.toThrow(InvalidExpenseDueDateError);
    });

    test("Should not update expense because expense does not exists", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "1";
        const expenseName = "Updated Expense Name";
        const expenseValue = 500;
        const dueDate = new Date("3000-01-01");
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(null);

        const result = sut.execute({
            id,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should update an existing expense successfully", async () => {
        const { sut } = makeSut();
        const id = "1";
        const expenseName = "Updated Expense Name";
        const expenseValue = 500;
        const dueDate = new Date("3000-01-01");

        const result = await sut.execute({
            id,
            expenseName,
            expenseValue,
            dueDate
        });

        expect(result).toBe(id);
    });
});