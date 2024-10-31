export type CreateExpenseDTO = {
    userId: string;
    expenseName: string;
    expenseValue: number;
    dueDate: Date;
}