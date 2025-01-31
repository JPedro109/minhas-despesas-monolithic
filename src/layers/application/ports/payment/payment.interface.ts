export interface IPayment {
    createCustomer(email: string): Promise<string>;
    updateCustomerEmailByCustomerId(
        customerId: string,
        email: string,
    ): Promise<void>;
    deleteCustomer(customerId: string): Promise<void>;
    attachmentPaymentMethodInCustomer(
        customerId: string,
        paymentMethodId: string,
    ): Promise<string>;
    deletePaymentMethodByToken(token: string): Promise<void>;
}
