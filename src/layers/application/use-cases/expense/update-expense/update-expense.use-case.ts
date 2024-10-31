import { IUpdateExpenseUseCase, IUnitOfWorkRepository, NotFoundError, UpdateExpenseDTO } from "@/layers/application";

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ expenseId, expenseName, expenseValue, dueDate }: UpdateExpenseDTO): Promise<string> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();

        const expense = await expenseRepository.getExpenseById(expenseId);
        if(!expense) throw new NotFoundError("Essa despesa não existe");

        expense.expenseName = expenseName;
        expense.expenseValue = expenseValue;
        expense.dueDate = dueDate;

        const expenseUpdated = await expenseRepository.updateExpenseById(expenseId, expense);

        return expenseUpdated.id;
    }
}