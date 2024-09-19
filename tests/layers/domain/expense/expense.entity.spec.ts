import { ExpenseEntity, DomainError, InvalidExpenseNameError, InvalidExpenseValueError, InvalidExpenseDueDateError } from "@/layers/domain";

describe("Entity - Expense", () => {

	test("Should not create expense, because expense name is not valid", () => {
		const invalidExpenseName = "";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");

		const sut = (): ExpenseEntity => new ExpenseEntity({
			enpenseName: invalidExpenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should not create expense, because expense value is not valid", () => {
		const expenseName = "Rent";
		const invalidExpenseValue = -100;
		const dueDate = new Date("3000-01-01");

		const sut = (): ExpenseEntity => new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: invalidExpenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should not create expense, because due date is not valid", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const invalidDueDate = new Date("2000-01-01");

		const sut = (): ExpenseEntity => new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: invalidDueDate,
			paid: false,
			createdAt: new Date()
		});

		expect(sut).toThrow(DomainError);
	});

	test("Should create expense", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");

		const sut = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expect(sut).toBeInstanceOf(ExpenseEntity);
	});

	test("Should not update expense name, because it is invalid", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		const sut = (): string => expense.expenseName = "";

		expect(sut).toThrow(InvalidExpenseNameError);
	});

	test("Should update expense name", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expense.expenseName = "Utilities";

		expect(expense.expenseName).toBe("Utilities");
	});

	test("Should not update expense value, because it is invalid", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		const sut = (): number => expense.expenseValue = -100;

		expect(sut).toThrow(InvalidExpenseValueError);
	});

	test("Should update expense value", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expense.expenseValue = 200;

		expect(expense.expenseValue).toBe(200);
	});

	test("Should not update due date, because it is invalid", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		const sut = (): Date => expense.dueDate = new Date("2000-01-01");

		expect(sut).toThrow(InvalidExpenseDueDateError);
	});

	test("Should update due date", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		const newDueDate = new Date("3000-01-01");
		expense.dueDate = newDueDate;

		expect(expense.dueDate).toBe(newDueDate);
	});

	test("Should not update paid status, because it is already false", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		const sut = (): boolean => expense.paid = false;

		expect(sut).toThrow(DomainError);
	});

	test("Should not update paid status, because it is already true", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: true,
			createdAt: new Date()
		});

		const sut = (): boolean => expense.paid = true;

		expect(sut).toThrow(DomainError);
	});

	test("Should update paid status", () => {
		const expenseName = "Rent";
		const expenseValue = 100;
		const dueDate = new Date("3000-01-01");
		const expense = new ExpenseEntity({
			enpenseName: expenseName,
			expenseValue: expenseValue,
			dueDate: dueDate,
			paid: false,
			createdAt: new Date()
		});

		expense.paid = true;

		expect(expense.paid).toBeTruthy();
	});
});