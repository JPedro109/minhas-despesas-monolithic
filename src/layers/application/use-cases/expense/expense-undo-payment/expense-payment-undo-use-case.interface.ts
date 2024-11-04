import { ExpensePaymentUndoDTO } from "@/layers/application";

export interface IExpensePaymentUndoUseCase {
    execute(dto: ExpensePaymentUndoDTO): Promise<string>;
}