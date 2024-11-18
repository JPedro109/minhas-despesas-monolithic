import { ExpenseUndoPaymentDTO } from "@/layers/application";

export interface IExpenseUndoPaymentUseCase {
    execute(dto: ExpenseUndoPaymentDTO): Promise<void>;
}