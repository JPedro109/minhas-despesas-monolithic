import { PrismaExpenseRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { ExpenseEntity } from "@/layers/domain";
import { Seed, testExpenseEntityPaid } from "./__mocks__";

describe("External - PrismaExpenseRepositoryAdapter", () => {
    const databaseSQLHelper = new DatabaseSQLHelper();

    beforeAll(async () => {
        await databaseSQLHelper.connect();
    });

    afterAll(async () => {
        await databaseSQLHelper.disconnect();
    });

    beforeEach(async () => {
        const seed = new Seed(databaseSQLHelper);
        await seed.populate();
    });

    afterEach(async () => {
        const seed = new Seed(databaseSQLHelper);
        await seed.truncate();
    });

    describe("createExpense", () => {
        test("Should create expense", async () => {
            const expense = new ExpenseEntity({
                userId: "00000000-0000-0000-0000-000000000000",
                expenseName: "Expense",
                expenseValue: 100,
                dueDate: new Date("3000-01-01"),
                paid: false,
            });
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            const result = await sut.createExpense(expense);

            expect(result).toBeInstanceOf(ExpenseEntity);
        });
    });

    describe("getExpenseById", () => {
        test("Should return null if expense does not exist", async () => {
            const id = "ffffffff-ffff-ffff-ffff-ffffffffffff";
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExpenseById(id);

            expect(result).toBeNull();
        });

        test("Should return expense by id", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExpenseById(id);

            expect(result).toBeInstanceOf(ExpenseEntity);
        });
    });

    describe("getExpensesByUserId", () => {
        test("Should return expenses for a user", async () => {
            const userId = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExpensesByUserId(userId);

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("getExpensesByDueDate", () => {
        test("Should return expenses by due date", async () => {
            const dueDate = new Date("3000-01-01");
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            const result = await sut.getExpensesByDueDate(dueDate);

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("updateExpenseById", () => {
        test("Should update expense", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const expense = testExpenseEntityPaid();
            expense.expenseName = "Expense 2";

            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);
            await sut.updateExpenseById(id, expense);

            const updatedExpense = await sut.getExpenseById(id);
            expect(updatedExpense.expenseName).toBe(expense.expenseName);
        });
    });

    describe("updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth", () => {
        test("Should update paid expenses to unpaid and add 1 month to dueDate", async () => {
            const month = 1; // January
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            await sut.updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth(
                month,
            );

            const expenses = await sut.getExpensesByDueDate(
                new Date("3000-02-01"),
            );
            expect(expenses.length).toBeGreaterThan(0);
        });
    });

    describe("deleteExpenseById", () => {
        test("Should delete an expense", async () => {
            const id = "00000000-0000-0000-0000-000000000000";
            const sut = new PrismaExpenseRepositoryAdapter(databaseSQLHelper);

            await sut.deleteExpenseById(id);

            const result = await sut.getExpenseById(id);
            expect(result).toBeNull();
        });
    });
});
