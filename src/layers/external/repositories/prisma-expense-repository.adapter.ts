import { IExpenseRepository } from "@/layers/application";
import { ExpenseEntity } from "@/layers/domain";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaExpenseRepositoryAdapter implements IExpenseRepository {
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createExpense(expenseEntity: ExpenseEntity): Promise<ExpenseEntity> {
        const expenseCreated = await this.context.prismaExpense.create({
            data: {
                id: expenseEntity.id,
                userId: expenseEntity.userId,
                expenseName: expenseEntity.expenseName,
                expenseValue: expenseEntity.expenseValue,
                dueDate: expenseEntity.dueDate,
                paid: expenseEntity.paid,
                createdAt: expenseEntity.createdAt,
                updatedAt: expenseEntity.updatedAt,
            },
        });
        return PrismaMapperHelper.toExpenseEntity(expenseCreated);
    }

    async getExpenseById(id: string): Promise<ExpenseEntity | null> {
        const expense = await this.context.prismaExpense.findUnique({
            where: { id },
        });
        return expense ? PrismaMapperHelper.toExpenseEntity(expense) : null;
    }

    async getExpensesByUserId(userId: string): Promise<ExpenseEntity[]> {
        const expenses = await this.context.prismaExpense.findMany({
            where: { userId },
        });
        return expenses.map((expense) =>
            PrismaMapperHelper.toExpenseEntity(expense),
        );
    }

    async getExpensesByDueDate(dueDate: Date): Promise<ExpenseEntity[]> {
        const expenses = await this.context.prismaExpense.findMany({
            where: { dueDate },
        });
        return expenses.map((expense) =>
            PrismaMapperHelper.toExpenseEntity(expense),
        );
    }

    async updateExpenseById(id: string, data: ExpenseEntity): Promise<void> {
        await this.context.prismaExpense.update({
            where: { id },
            data: {
                expenseName: data.expenseName,
                expenseValue: data.expenseValue,
                dueDate: data.dueDate,
                paid: data.paid,
                updatedAt: data.updatedAt,
            },
        });
    }

    async updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth(
        month: number,
    ): Promise<void> {
        await this.context.$queryRaw`
            UPDATE expenses
            SET paid = false, due_date = due_date + INTERVAL '1 month'
            WHERE EXTRACT(MONTH FROM due_date) = ${month} AND paid = true;
        `;
    }

    async deleteExpenseById(id: string): Promise<void> {
        await this.context.prismaExpense.delete({ where: { id } });
    }
}
