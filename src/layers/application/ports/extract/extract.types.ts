export type ExpenseExtractProps = {
    referenceMonth: number;
    referenceYear: number;
    data: {
        expenseId: string;
        expenseName: string;
        expenseValue: number;
        dueDate: Date;
        paidDate: Date;
    }[]
}