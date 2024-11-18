import { PaymentHistoryEntity } from "@/layers/domain";

export interface IPaymentHistoryRepository {
    createPaymentHistory(paymentHistory: PaymentHistoryEntity): Promise<PaymentHistoryEntity>;
    getPaymentHistoriesByUserIdAndPaymentMonthAndPaymentYear(
        userId: string, 
        paymentMonth: number, 
        paymentYear: number
    ): Promise<PaymentHistoryEntity[]>;
    deletePaymentHistoriesByExpenseId(expenseId: string): Promise<void>;
    deletePaymentHistoryByExpenseIdAndPaymentMonthAndPaymentYear(
        expenseId: string, 
        paymentMonth: number,
        paymentYear: number
    ): Promise<void>;
}