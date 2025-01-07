import { PaymentCurrencyEnum } from "@/layers/application";
import { StripeAdapter } from "@/layers/external";

describe("External - StripeAdapter", () => {
    test("Should create customer | createCustomer", async () => {
        const email = "email@test.com";
        const sut = new StripeAdapter();

        const result = await sut.createCustomer(email);

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(result);
    });

    test("Should update customer email | updateCustomerEmailByCustomerId", async () => {
        const email = "email@test.com";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);
        const updateCustomerEmailByCustomerIdSpy = jest.spyOn(
            sut,
            "updateCustomerEmailByCustomerId",
        );

        await sut.updateCustomerEmailByCustomerId(customerId, email);

        expect(updateCustomerEmailByCustomerIdSpy).toHaveBeenCalled();
        expect(updateCustomerEmailByCustomerIdSpy).toHaveBeenCalledWith(
            customerId,
            email,
        );

        await sut.deleteCustomer(customerId);
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

    test("Should create payment method | createPaymentMethod", async () => {
        const email = "email@test.com";
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);

        const result = await sut.createPaymentMethod(customerId, token);

        expect(typeof result).toBe("string");

        await sut.deleteCustomer(customerId);
    });

    test("Should delete payment method | deletePaymentMethodByToken", async () => {
        const email = "email@test.com";
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);
        const paymentMethodId = await sut.createPaymentMethod(
            customerId,
            token,
        );
        const deletePaymentMethodByTokenSpy = jest.spyOn(
            sut,
            "deletePaymentMethodByToken",
        );

        await sut.deletePaymentMethodByToken(paymentMethodId);

        expect(deletePaymentMethodByTokenSpy).toHaveBeenCalled();
        expect(deletePaymentMethodByTokenSpy).toHaveBeenCalledWith(
            paymentMethodId,
        );

        await sut.deleteCustomer(customerId);
    });

    test("Should pay | pay", async () => {
        const email = "email@test.com";
        const token = "pm_card_visa";
        const sut = new StripeAdapter();
        const customerId = await sut.createCustomer(email);
        await sut.createPaymentMethod(customerId, token);
        const paySpy = jest.spyOn(sut, "pay");

        await sut.pay(customerId, token, 500, PaymentCurrencyEnum.BRL);

        expect(paySpy).toHaveBeenCalled();
        expect(paySpy).toHaveBeenCalledWith(
            customerId,
            token,
            500,
            PaymentCurrencyEnum.BRL,
        );

        await sut.deleteCustomer(customerId);
    });
});
