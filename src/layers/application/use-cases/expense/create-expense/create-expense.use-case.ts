import { ExpenseEntity } from "@/layers/domain";
import { IUnitOfWorkRepository, CreateExpenseDTO } from "@/layers/application";

export class CreateExpenseUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId, expenseName, expenseValue, dueDate }: CreateExpenseDTO): Promise<string> {
        const expense = new ExpenseEntity({
            userId,
            expenseName,
            expenseValue,
            dueDate,
            paid: false
        });

        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();

        const expenseCreated = await expenseRepository.createExpense(expense);

        return expenseCreated.id;
    }
}