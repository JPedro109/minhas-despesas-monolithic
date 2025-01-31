import { StripeAdapter } from "@/layers/external";

describe("External - StripeAdapter", () => {
    test("Should create customer | createCustomer", async () => {
        const email = "email@test.com";
        const sut = new StripeAdapter();

        const result = await sut.createCustomer(email);

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(result);
    });

    test("Should delete customer | deleteCustomer", async () => {
        const email = "email@test.com";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);
        const deleteCustomerSpy = jest.spyOn(sut, "deleteCustomer");

        await sut.deleteCustomer(customerId);

        expect(deleteCustomerSpy).toHaveBeenCalled();
        expect(deleteCustomerSpy).toHaveBeenCalledWith(customerId);
    });

    test("Should create payment method | attachmentPaymentMethodInCustomer", async () => {
        const email = "email@test.com";
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);

        const result = await sut.attachmentPaymentMethodInCustomer(
            customerId,
            token,
        );

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(customerId);
    });

    test("Should delete payment method | detachmentPaymentMethodInCustomerByToken", async () => {
        const email = "email@test.com";
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);
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
