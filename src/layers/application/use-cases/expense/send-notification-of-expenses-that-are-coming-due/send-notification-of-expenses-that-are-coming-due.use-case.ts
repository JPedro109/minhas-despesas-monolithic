import { 
    IMail,
    ISendNotificationOfExpensesThatAreComingDueUseCase, 
    IUnitOfWorkRepository,
    MailBodyTypeEnum
} from "@/layers/application";

export class SendNotificationOfExpensesThatAreComingDueUseCase implements ISendNotificationOfExpensesThatAreComingDueUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly mail: IMail
    ) { }

    async execute(): Promise<void> {
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        
        const today = new Date();
        const dueDateOfExpenses = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);        
        dueDateOfExpenses.setDate(dueDateOfExpenses.getUTCDate() + 1);
        const expenses = await expenseRepository.getExpensesByDueDate(dueDateOfExpenses);

        if(expenses.length === 0) return;

        const expensesMap = new Map<string, { expenseName: string, expenseValue: number }[]>();
        expenses.forEach(expense => {
            const userExpenses = expensesMap.get(expense.userId);

            if(!userExpenses) {
                expensesMap.set(
                    expense.userId, 
                    [ { expenseName: expense.expenseName, expenseValue: expense.expenseValue } ]
                );
            } else {
                userExpenses.push({ expenseName: expense.expenseName, expenseValue: expense.expenseValue });
                expensesMap.set(expense.userId, userExpenses);
            }
        });

        const userIds = Object.keys(
            Object.fromEntries(expensesMap)
        );
        const users = await userRepository.getUsersByIds(userIds);

        const emails = [];
        users.forEach(user => {
            const expenses = expensesMap.get(user.id);
            const email = this.mail.sendMail(user.email, MailBodyTypeEnum.NotifyExpenseThatIsDueBody, expenses);
            emails.push(email);
        });

        const results = await Promise.allSettled(emails);

        const rejectedPromises = results.filter(x => x.status === "rejected");

        if(rejectedPromises.length > 0) {
            const errors = rejectedPromises.map(x => x.reason.message);
            throw new Error(errors.join(", "));
        }
    }
}