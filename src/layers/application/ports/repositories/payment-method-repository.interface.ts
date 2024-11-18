import { PaymentMethodEntity } from "@/layers/domain";

export interface IPaymentMethodRepository {
    setContext(context: unknown): void;    
    createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity>;
    getPaymentMethodById(id: string): Promise<PaymentMethodEntity | null>;
    getPaymentMethodByUserId(userId: string): Promise<PaymentMethodEntity | null>;
    getPaymentMethodsByUserIds(userIds: string[]): Promise<PaymentMethodEntity[]>;
    updatePaymentMethodById(paymentMethodId: string, paymentMethod: PaymentMethodEntity): Promise<void>;
    deletePaymentMethodById(paymentMethodId: string): Promise<void>;
}