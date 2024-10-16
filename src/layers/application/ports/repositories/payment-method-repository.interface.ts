import { PaymentMethodEntity } from "@/layers/domain";

export interface IPaymentMethodRepository {
    setContext(context: unknown): void;    
    createPaymentMethod(paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity>;
    getPaymentMethodById(name: string): Promise<PaymentMethodEntity | null>;
    getPaymentMethodByName(name: string): Promise<PaymentMethodEntity | null>;
    updatePaymentMethodById(paymentMethodId: string, paymentMethod: PaymentMethodEntity): Promise<PaymentMethodEntity>;
    deletePaymentMethodById(paymentMethodId: string): Promise<PaymentMethodEntity>;
}