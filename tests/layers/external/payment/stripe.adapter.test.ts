import { StripeAdapter } from "@/layers/external";

describe("External - StripeAdapter", () => {
    test("Should create customer | createCustomer", async () => {
        const sut = new StripeAdapter();

        const result = await sut.createCustomer();

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(result);
    });

    test("Should delete customer | deleteCustomer", async () => {
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const deleteCustomerSpy = jest.spyOn(sut, "deleteCustomer");

        await sut.deleteCustomer(customerId);

        expect(deleteCustomerSpy).toHaveBeenCalled();
        expect(deleteCustomerSpy).toHaveBeenCalledWith(customerId);
    });

    test("Should create payment method | attachmentPaymentMethodInCustomer", async () => {
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();

        const result = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(customerId);
    });

    test("Should create subscription | createSubscription", async () => {
        const token = "pm_card_visa";
        const planExternalId = "price_1QkaxzRu300ehj2uYbE4FbTP";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const paymentMethodId = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );

        const result = await sut.createSubscription(
            customerId,
            planExternalId,
            paymentMethodId,
        );

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(customerId);
    });

    test("Should get subscription | createSubscription", async () => {
        const token = "pm_card_visa";
        const planExternalId = "price_1QkaxzRu300ehj2uYbE4FbTP";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const paymentMethodId = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );
        const subscriptionExternalId = await sut.createSubscription(
            customerId,
            planExternalId,
            paymentMethodId,
        );

        const result = await sut.getSubscriptionBySubscriptionExternalId(
            subscriptionExternalId,
        );

        expect(result).not.toBeNull();

        await sut.deleteCustomer(customerId);
    });

    test("Should update subscription renewable | updateSubscriptionRenewable", async () => {
        const token = "pm_card_visa";
        const planExternalId = "price_1QkaxzRu300ehj2uYbE4FbTP";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const paymentMethodId = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );
        const subscriptionExternalId = await sut.createSubscription(
            customerId,
            planExternalId,
            paymentMethodId,
        );

        const result = await sut.deleteSubscription(subscriptionExternalId);

        expect(result).not.toBeNull();

        await sut.deleteCustomer(customerId);
    });

    test("Should delete subscription renewable | deleteSubscription", async () => {
        const token = "pm_card_visa";
        const planExternalId = "price_1QkaxzRu300ehj2uYbE4FbTP";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const paymentMethodId = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );
        const subscriptionExternalId = await sut.createSubscription(
            customerId,
            planExternalId,
            paymentMethodId,
        );

        const result = await sut.updateSubscriptionRenewable(
            subscriptionExternalId,
            false,
        );

        expect(result).not.toBeNull();

        await sut.deleteCustomer(customerId);
    });

    test("Should delete payment method | detachmentPaymentMethodInCustomerByToken", async () => {
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer();
        const paymentMethodId = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );
        const deletePaymentMethodByTokenSpy = jest.spyOn(
            sut,
            "detachmentPaymentMethodInCustomerByToken",
        );

        await sut.detachmentPaymentMethodInCustomerByToken(paymentMethodId);

        expect(deletePaymentMethodByTokenSpy).toHaveBeenCalled();
        expect(deletePaymentMethodByTokenSpy).toHaveBeenCalledWith(
            paymentMethodId,
        );

        await sut.deleteCustomer(customerId);
    });
});
