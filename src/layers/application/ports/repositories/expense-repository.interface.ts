import { ExpenseEntity } from "@/layers/domain";

export interface IExpenseRepository {
    setContext(context: unknown): void;
    createExpense(expenseEntity: ExpenseEntity): Promise<ExpenseEntity>;
    getExpenseById(id: string): Promise<ExpenseEntity | null>;
    getExpensesByUserId(userId: string): Promise<ExpenseEntity[]>;
    getExpensesByDueDate(dueDate: Date): Promise<ExpenseEntity[]>;
    updateExpenseById(id: string, data: ExpenseEntity): Promise<void>;
    updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth(
        month: number,
    ): Promise<void>;
    deleteExpenseById(id: string): Promise<void>;
}
