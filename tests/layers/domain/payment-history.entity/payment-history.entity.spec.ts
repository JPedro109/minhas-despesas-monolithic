import { PaymentHistoryEntity } from "@/layers/domain";

describe("Entity - PaymentHistory", () => {

    test("Should create history payment entity", () => {
        const userId = "1";
        const expenseId = "1";
        const expenseName = "Expense Name";
        const expenseValue = 100.00;
        const dueDate = new Date("2024-12-01");
        const paidDate = new Date("2024-11-01");
        const createdAt = new Date("2024-10-01");
        const sut = new PaymentHistoryEntity({
            userId,
            expenseId,
            expenseName,
            expenseValue,
            dueDate,
            paidDate,
            createdAt
        });

        expect(sut).toBeInstanceOf(PaymentHistoryEntity);
        expect(sut.userId).toBe(userId);
        expect(sut.expenseId).toBe(expenseId);
        expect(sut.expenseName).toBe(expenseName);
        expect(sut.expenseValue).toBe(expenseValue);
        expect(sut.dueDate).toEqual(dueDate);
        expect(sut.paidDate).toEqual(paidDate);
        expect(sut.createdAt).toEqual(createdAt);
    });
});