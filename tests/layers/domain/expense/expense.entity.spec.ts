import {
    ExpenseEntity,
    DomainError,
    InvalidExpenseNameError,
    InvalidExpenseValueError,
    InvalidExpenseDueDateError,
} from "@/layers/domain";

describe("Entity - Expense", () => {
    test("Should not create ExpenseEntity, because expense name is not valid", () => {
        const userId = "1";
        const invalidExpenseName = "";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;

        const sut = (): ExpenseEntity =>
            new ExpenseEntity({
                userId,
                expenseName: invalidExpenseName,
                expenseValue,
                dueDate,
                paid,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create ExpenseEntity, because expense value is not valid", () => {
        const userId = "1";
        const expenseName = "Rent";
        const invalidExpenseValue = -100;
        const dueDate = new Date("3000-01-01");
        const paid = false;

        const sut = (): ExpenseEntity =>
            new ExpenseEntity({
                userId,
                expenseName,
                expenseValue: invalidExpenseValue,
                dueDate,
                paid,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create ExpenseEntity, because due date is not valid", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const invalidDueDate = new Date("2000-01-01");
        const paid = false;

        const sut = (): ExpenseEntity =>
            new ExpenseEntity({
                userId,
                expenseName,
                expenseValue,
                dueDate: invalidDueDate,
                paid,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should create ExpenseEntity", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;

        const sut = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        expect(sut).toBeInstanceOf(ExpenseEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.expenseName).toBe(expenseName);
        expect(sut.expenseValue).toBe(expenseValue);
        expect(sut.dueDate).toBe(dueDate);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });

    test("Should not update expense name, because it is invalid", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const sut = (): string => (expense.expenseName = "");

        expect(sut).toThrow(InvalidExpenseNameError);
    });

    test("Should update expense name", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        expense.expenseName = "Utilities";

        expect(expense.expenseName).toBe("Utilities");
    });

    test("Should not update expense value, because it is invalid", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const sut = (): number => (expense.expenseValue = -100);

        expect(sut).toThrow(InvalidExpenseValueError);
    });

    test("Should update expense value", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        expense.expenseValue = 200;

        expect(expense.expenseValue).toBe(200);
    });

    test("Should not update due date, because it is invalid", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const sut = (): Date => (expense.dueDate = new Date("2000-01-01"));

        expect(sut).toThrow(InvalidExpenseDueDateError);
    });

    test("Should update due date", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const newDueDate = new Date("3000-01-01");
        expense.dueDate = newDueDate;

        expect(expense.dueDate).toBe(newDueDate);
    });

    test("Should not update paid status, because it is already false", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const sut = (): boolean => (expense.paid = false);

        expect(sut).toThrow(DomainError);
    });

    test("Should not update paid status, because it is already true", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = true;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        const sut = (): boolean => (expense.paid = true);

        expect(sut).toThrow(DomainError);
    });

    test("Should update paid status", () => {
        const userId = "1";
        const expenseName = "Rent";
        const expenseValue = 100;
        const dueDate = new Date("3000-01-01");
        const paid = false;
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid,
        });

        expense.paid = true;

        expect(expense.paid).toBeTruthy();
    });
});
