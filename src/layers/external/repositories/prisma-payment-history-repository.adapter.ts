import { PaymentHistoryEntity } from "@/layers/domain";
import { IPaymentHistoryRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

import { PrismaPaymentHistory } from "@prisma/client";

export class PrismaPaymentHistoryRepositoryAdapter
    implements IPaymentHistoryRepository
{
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createPaymentHistory(
        paymentHistory: PaymentHistoryEntity,
    ): Promise<PaymentHistoryEntity> {
        const created = await this.context.prismaPaymentHistory.create({
            data: {
                id: paymentHistory.id,
                userId: paymentHistory.userId,
                expenseId: paymentHistory.expenseId,
                expenseName: paymentHistory.expenseName,
                expenseValue: paymentHistory.expenseValue,
                dueDate: paymentHistory.dueDate,
                paymentDate: paymentHistory.paidDate,
                createdAt: paymentHistory.createdAt,
            },
        });

        return PrismaMapperHelper.toPaymentHistoryEntity(created);
    }

    async getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
        userId: string,
        paymentMonth: number,
        paymentYear: number,
    ): Promise<PaymentHistoryEntity[]> {
        const histories = (await this.context.$queryRaw`
                SELECT * FROM payment_histories
                WHERE user_id = ${userId}::uuid
                    AND EXTRACT(MONTH FROM due_date) = ${paymentMonth} 
                    AND EXTRACT(YEAR FROM due_date) = ${paymentYear};
            `) as Record<string, unknown>[];

        const historiesFormatted = histories.map((history) => {
            const object = {};
            for (const key in history) {
                const value = history[key];
                object[
                    key.replace(/_([a-z])/g, (_, letter) =>
                        letter.toUpperCase(),
                    )
                ] = value;
            }
            return object;
        }) as unknown as PrismaPaymentHistory[];

        return historiesFormatted.map((history) =>
            PrismaMapperHelper.toPaymentHistoryEntity(history),
        );
    }

    async deletePaymentHistoriesByExpenseId(expenseId: string): Promise<void> {
        await this.context.prismaPaymentHistory.deleteMany({
            where: { expenseId },
        });
    }

    async deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear(
        expenseId: string,
        paymentMonth: number,
        paymentYear: number,
    ): Promise<void> {
        await this.context.$queryRaw`
            DELETE FROM payment_histories
            WHERE expense_id = ${expenseId}::uuid
                  AND EXTRACT(MONTH FROM due_date) = ${paymentMonth} 
                  AND EXTRACT(YEAR FROM due_date) = ${paymentYear};
        `;
    }
}
