import { 
    IUpdatePreviousMonthPaidExpensesToUnpaidUseCase, 
    IUnitOfWorkRepository
} from "@/layers/application";

export class UpdatePreviousMonthPaidExpensesToUnpaidUseCase implements IUpdatePreviousMonthPaidExpensesToUnpaidUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute(): Promise<void> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        await expenseRepository.updatePaidExpensesToUnpaidAndSumOneInDueDateMonthByDueDateMonth(new Date().getUTCMonth() - 1);
    }
}