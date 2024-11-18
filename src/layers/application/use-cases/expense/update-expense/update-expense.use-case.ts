import { IUpdateExpenseUseCase, IUnitOfWorkRepository, NotFoundError, UpdateExpenseDTO } from "@/layers/application";

export class UpdateExpenseUseCase implements IUpdateExpenseUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ id, expenseName, expenseValue, dueDate }: UpdateExpenseDTO): Promise<void> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();

        const expense = await expenseRepository.getExpenseById(id);
        if(!expense) throw new NotFoundError("Essa despesa não existe");

        expense.expenseName = expenseName;
        expense.expenseValue = expenseValue;
        expense.dueDate = dueDate;

        await expenseRepository.updateExpenseById(id, expense);
    }
}