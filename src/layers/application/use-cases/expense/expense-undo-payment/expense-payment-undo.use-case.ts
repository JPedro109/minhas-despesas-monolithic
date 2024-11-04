import { ExpenseEntity } from "@/layers/domain";
import { IExpensePaymentUndoUseCase, IUnitOfWorkRepository, NotFoundError, ExpensePaymentUndoDTO } from "@/layers/application";

export class ExpensePaymentUndoUseCase implements IExpensePaymentUndoUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ id }: ExpensePaymentUndoDTO): Promise<string> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        const paymentHistoryRepository = this.unitOfWorkRepository.getPaymentHistory();

        const expense = await expenseRepository.getExpenseById(id);
        if(!expense) throw new NotFoundError("Essa despesa não existe");

        expense.paid = false;

        let unpaidExpense: ExpenseEntity; 
        
        await this.unitOfWorkRepository.transaction(async () => {
            unpaidExpense = await expenseRepository.updateExpenseById(id, expense);
            const date = new Date();
            await paymentHistoryRepository.deletePaymentHistoryByExpenseIdAndPaymentMonthAndPaymentYear(
                id,
                date.getUTCMonth(),
                date.getUTCFullYear(),
            );
        });

        return unpaidExpense.id;
    }
}