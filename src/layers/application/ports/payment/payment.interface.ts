import { SubscriptionData } from "@/layers/application";

export interface IPayment {
    createCustomer(email: string): Promise<string>;
    deleteCustomer(customerId: string): Promise<void>;
    attachmentPaymentMethodInCustomer(
        customerId: string,
        paymentMethodId: string,
    ): Promise<string>;
    detachmentPaymentMethodInCustomerByToken(token: string): Promise<void>;
    createSubscription(
        customerId: string,
        planExternalId: string,
        paymentMethod: string,
    ): Promise<string>;
    getSubscriptionBySubscriptionExternalId(
        subscriptionExternalId: string,
    ): Promise<SubscriptionData>;
    updateSubscriptionRenewable(
        subscriptionId: string,
        renewable: boolean,
    ): Promise<void>;
}
