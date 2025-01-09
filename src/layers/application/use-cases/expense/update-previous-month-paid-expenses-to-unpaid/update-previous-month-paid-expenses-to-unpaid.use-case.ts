import {
    IUpdatePreviousMonthPaidExpensesToUnpaidUseCase,
    IUnitOfWorkRepository,
} from "@/layers/application";

export class UpdatePreviousMonthPaidExpensesToUnpaidUseCase
    implements IUpdatePreviousMonthPaidExpensesToUnpaidUseCase
{
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) {}

    async execute(): Promise<void> {
        const date = new Date();
        const dateWithPreviousMonth = new Date().setMonth(date.getMonth() - 1);
        const previousMonth = new Date(dateWithPreviousMonth).getMonth() + 1;
        const expenseRepository =
            this.unitOfWorkRepository.getExpenseRepository();
        await expenseRepository.updatePaidExpensesToUnpaidAndSumOneInDueMonthByDueMonth(
            previousMonth,
        );
    }
}
