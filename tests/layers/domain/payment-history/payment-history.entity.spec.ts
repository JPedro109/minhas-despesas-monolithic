import { PaymentHistoryEntity } from "@/layers/domain";

describe("Entity - PaymentHistory", () => {
    test("Should create PaymentHistoryEntity", () => {
        const userId = "1";
        const expenseId = "1";
        const expenseName = "Expense Name";
        const expenseValue = 100.0;
        const dueDate = new Date("2024-12-01");
        const paidDate = new Date("2024-11-01");

        const sut = new PaymentHistoryEntity({
            userId,
            expenseId,
            expenseName,
            expenseValue,
            dueDate,
            paidDate,
        });

        expect(sut).toBeInstanceOf(PaymentHistoryEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.userId).toBe(userId);
        expect(sut.expenseId).toBe(expenseId);
        expect(sut.expenseName).toBe(expenseName);
        expect(sut.expenseValue).toBe(expenseValue);
        expect(sut.dueDate).toEqual(dueDate);
        expect(sut.paidDate).toEqual(paidDate);
        expect(sut.createdAt).not.toBeUndefined();
    });
});
