import { ExpenseEntity } from "@/layers/domain";
import { IUnitOfWorkRepository, CreateExpenseDTO, ICreateExpenseUseCase, NotFoundError } from "@/layers/application";

export class CreateExpenseUseCase implements ICreateExpenseUseCase {
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
        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const userExists = await userRepository.getUserById(userId);
        if(!userExists) throw new NotFoundError("O usuário não existe");

        const expenseCreated = await expenseRepository.createExpense(expense);

        return expenseCreated.id;
    }
}