import { IUnitOfWorkRepository, GetUserExpensesDTO, GetUserExpensesResponseDTO } from "@/layers/application";

export class GetUserExpensesUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId }: GetUserExpensesDTO): Promise<GetUserExpensesResponseDTO[]> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();

        const expenses = await expenseRepository.getExpensesByUserId(userId);

        return expenses.map(x => ({
            userId: x.userId,
            expenseId: x.id,
            expenseName: x.expenseName,
            expenseValue: x.expenseValue,
            dueDate: x.dueDate,
            paid: x.paid
        }));
    }
}