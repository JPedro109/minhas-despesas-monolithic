import { 
    IUnitOfWorkRepository, 
    GetUserExpensesDTO, 
    GetUserExpensesResponseDTO, 
    IGetUserExpensesUseCase, 
    NotFoundError 
} from "@/layers/application";

export class GetUserExpensesUseCase implements IGetUserExpensesUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId }: GetUserExpensesDTO): Promise<GetUserExpensesResponseDTO[]> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const userExists = await userRepository.getUserById(userId);
        if(!userExists) throw new NotFoundError("O usuário não existe");

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