import { ExtractAdapter } from "@/layers/external";
import { ExpenseExtractProps } from "@/layers/application";

describe("External - ExtractAdapter", () => {
    test("Should generate a valid buffer for the expense statement", async () => {
        const sut = new ExtractAdapter();
        const data: ExpenseExtractProps = {
            referenceMonth: 12,
            referenceYear: 2024,
            data: [
                {
                    expenseId: "1",
                    expenseName: "Energia Elétrica",
                    expenseValue: 250.75,
                    dueDate: new Date("2024-12-10"),
                    paidDate: new Date("2024-12-05"),
                },
                {
                    expenseId: "2",
                    expenseName: "Água",
                    expenseValue: 120.0,
                    dueDate: new Date("2024-12-12"),
                    paidDate: new Date("2024-12-13"),
                },
            ],
        };

        const pdfBuffer = await sut.generateExpensesExtract(data);

        expect(pdfBuffer).toBeInstanceOf(Buffer);
    });
});
