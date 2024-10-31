export type GetUserExpensesDTO = {
    userId: string;
}

export type GetUserExpensesResponseDTO = {
    userId: string;
    expenseId: string;
    expenseName: string;
    expenseValue: number;
    dueDate: Date;
    paid: boolean;
}