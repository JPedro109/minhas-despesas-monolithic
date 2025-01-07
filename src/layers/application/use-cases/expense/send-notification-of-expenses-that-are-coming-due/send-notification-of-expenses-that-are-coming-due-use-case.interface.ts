export interface ISendNotificationOfExpensesThatAreComingDueUseCase {
    execute(): Promise<void>;
}
