import { ExpenseEntity, PaymentHistoryEntity } from "@/layers/domain";
import { IPayExpenseUseCase, IUnitOfWorkRepository, NotFoundError, PayExpenseDTO } from "@/layers/application";

export class PayExpenseUseCase implements IPayExpenseUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ id }: PayExpenseDTO): Promise<string> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        const paymentHistoryRepository = this.unitOfWorkRepository.getPaymentHistoryRepository();

        const expense = await expenseRepository.getExpenseById(id);
        if(!expense) throw new NotFoundError("Essa despesa não existe");

        expense.paid = true;

        const paymentHistory = new PaymentHistoryEntity({
            expenseId: expense.id,
            expenseName: expense.expenseName,
            expenseValue: expense.expenseValue,
            dueDate: expense.dueDate,
            paidDate: new Date(),
            userId: expense.userId
        });

        let paidExpense: ExpenseEntity; 
        
        await this.unitOfWorkRepository.transaction(async () => {
            paidExpense = await expenseRepository.updateExpenseById(id, expense);
            await paymentHistoryRepository.createPaymentHistory(paymentHistory);
        });

        return paidExpense.id;
    }
}