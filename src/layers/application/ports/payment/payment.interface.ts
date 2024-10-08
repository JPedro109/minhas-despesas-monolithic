import { PaymentCurrencyEnum } from "./payment-currency.enum";

export interface IPayment {
    createCustomer(email: string): Promise<string>;
    updateCustomer(customerId: string, email: string): Promise<void>;
    deleteCustomer(customerId: string): Promise<void>;
    pay(customerId: string, paymentMethodId: string, amount: number, currency: PaymentCurrencyEnum): Promise<void>;
}