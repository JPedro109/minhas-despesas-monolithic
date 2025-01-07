import { PrismaPaymentHistoryRepositoryAdapter } from "@/layers/external";
import { DatabaseSQLHelper } from "@/layers/external";
import { PaymentHistoryEntity } from "@/layers/domain";
import { Seed } from "./__mocks__";

describe("External - PrismaPaymentHistoryRepositoryAdapter", () => {
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

    describe("createPaymentHistory", () => {
        test("Should create payment history", async () => {
            const paymentHistory = new PaymentHistoryEntity({
                userId: "00000000-0000-0000-0000-000000000000",
                expenseId: "00000000-0000-0000-0000-000000000000",
                dueDate: new Date(),
                expenseName: "Name",
                expenseValue: 100,
                paidDate: new Date(),
            });

            const sut = new PrismaPaymentHistoryRepositoryAdapter(
                databaseSQLHelper,
            );

            const result = await sut.createPaymentHistory(paymentHistory);

            expect(result).toBeInstanceOf(PaymentHistoryEntity);
        });
    });

    describe("getPaymentHistoriesByUserIdAndDueMonthAndDueYear", () => {
        test("Should return empty array if no data matches", async () => {
            const sut = new PrismaPaymentHistoryRepositoryAdapter(
                databaseSQLHelper,
            );

            const result =
                await sut.getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
                    "ffffffff-ffff-ffff-ffff-ffffffffffff",
                    1,
                    3000,
                );

            expect(result).toEqual([]);
        });

        test("Should return payment histories", async () => {
            const sut = new PrismaPaymentHistoryRepositoryAdapter(
                databaseSQLHelper,
            );

            const result =
                await sut.getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
                    "00000000-0000-0000-0000-000000000000",
                    1,
                    3000,
                );

            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe("deletePaymentHistoriesByExpenseId", () => {
        test("Should delete payment histories by expenseId", async () => {
            const sut = new PrismaPaymentHistoryRepositoryAdapter(
                databaseSQLHelper,
            );

            await sut.deletePaymentHistoriesByExpenseId(
                "00000000-0000-0000-0000-000000000000",
            );

            const result =
                await sut.getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
                    "00000000-0000-0000-0000-000000000000",
                    1,
                    3000,
                );
            expect(result).toEqual([]);
        });
    });

    describe("deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear", () => {
        test("Should delete specific payment history", async () => {
            const sut = new PrismaPaymentHistoryRepositoryAdapter(
                databaseSQLHelper,
            );

            await sut.deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear(
                "00000000-0000-0000-0000-000000000000",
                1,
                3000,
            );

            const result =
                await sut.getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
                    "00000000-0000-0000-0000-000000000000",
                    1,
                    3000,
                );
            expect(result).toEqual([]);
        });
    });
});
