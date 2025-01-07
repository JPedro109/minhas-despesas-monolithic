import { DomainError } from "@/layers/domain";
import {
    CreateExpenseUseCase,
    ForbiddenError,
    NotFoundError,
} from "@/layers/application";
import {
    ExpenseRepositoryStub,
    testExpenseEntityPaid,
    unitOfWorkRepositoryStubFactory,
    UserRepositoryStub,
} from "../__mocks__";

const makeSut = (): {
    sut: CreateExpenseUseCase;
    userRepositoryStub: UserRepositoryStub;
    expenseRepositoryStub: ExpenseRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new CreateExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
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
            dueDate,
        });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should not create expense because user is not exists", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "3";
        const expenseName = "Expense";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        jest.spyOn(userRepositoryStub, "getUserById").mockResolvedValueOnce(
            null,
        );

        const result = sut.execute({
            userId,
            expenseName,
            expenseValue,
            dueDate,
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not create expense because user already has the maximum number of expenses", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const userId = "2";
        const expenseName = "Expense";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const expense = testExpenseEntityPaid();
        jest.spyOn(
            expenseRepositoryStub,
            "getExpensesByUserId",
        ).mockResolvedValueOnce([
            expense,
            expense,
            expense,
            expense,
            expense,
            expense,
            expense,
            expense,
            expense,
            expense,
        ]);

        const result = sut.execute({
            userId,
            expenseName,
            expenseValue,
            dueDate,
        });

        await expect(result).rejects.toThrow(ForbiddenError);
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
            dueDate,
        });

        expect(typeof result).toBe("string");
    });
});
