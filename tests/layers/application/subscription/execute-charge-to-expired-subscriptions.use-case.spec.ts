import { ExecuteChargeToExpiredSubscriptionsUseCase, PaymentCurrencyEnum } from "@/layers/application";
import {
    PaymentStub,
    SubscriptionRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    paymentStubFactory,
    testSubscriptionEntityWithPlanFree,
    testPaymentMethodEntity,
    testCustomerEntity
} from "../__mocks__";

const makeSut = (): {
    sut: ExecuteChargeToExpiredSubscriptionsUseCase,
    paymentStub: PaymentStub,
    subscriptionRepositoryStub: SubscriptionRepositoryStub
} => {
    const paymentStub = paymentStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new ExecuteChargeToExpiredSubscriptionsUseCase(
        unitOfWorkRepositoryStub,
        paymentStub
    );

    return {
        sut,
        paymentStub,
        subscriptionRepositoryStub: unitOfWorkRepositoryStub.getSubscriptionRepository()
    };
};

describe("Use case - ExecuteChargeToExpiredSubscriptionsUseCase", () => {

    test("Should not execute charge if there are no subscriptions due soon", async () => {
        const { sut, subscriptionRepositoryStub, paymentStub } = makeSut();
        const paySpy = jest.spyOn(paymentStub, "pay");
        jest.spyOn(subscriptionRepositoryStub, "getActiveSubscriptionsByEndDate").mockResolvedValueOnce([]);

        await sut.execute();

        expect(paySpy).not.toHaveBeenCalled();
    });


    test("Should execute charge", async () => {
        const { sut, paymentStub } = makeSut();
        const paySpy = jest.spyOn(paymentStub, "pay");

        await sut.execute();

        expect(paySpy).toHaveBeenCalledWith(
            testCustomerEntity().customerId, 
            testPaymentMethodEntity().token, 
            testSubscriptionEntityWithPlanFree().amount, 
            PaymentCurrencyEnum.BRL
        );
    });
});