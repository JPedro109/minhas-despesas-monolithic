import { PaymentHistoryEntity } from "@/layers/domain";

export interface IPaymentHistoryRepository {
    setContext(context: unknown): void;    
    createPaymentHistory(paymentHistory: PaymentHistoryEntity): Promise<PaymentHistoryEntity>;
    getPaymentHistoriesByUserIdAndDueMonthAndDueYear(
        userId: string, 
        paymentMonth: number, 
        paymentYear: number
    ): Promise<PaymentHistoryEntity[]>;
    deletePaymentHistoriesByExpenseId(expenseId: string): Promise<void>;
    deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear(
        expenseId: string, 
        paymentMonth: number,
        paymentYear: number
    ): Promise<void>;
}