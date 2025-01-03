import { NotFoundError, DeletePaymentMethodUseCase, ForbiddenError } from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    PaymentStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    paymentStubFactory,
    testSubscriptionEntityWithPlanDiamondNotRenewable,
    testSubscriptionEntityWithPlanDiamond
} from "../__mocks__";

const makeSut = (): {
    sut: DeletePaymentMethodUseCase,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub,
    subscriptionRepositoryStub: SubscriptionRepositoryStub,
    paymentStub: PaymentStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new DeletePaymentMethodUseCase(unitOfWorkRepositoryStub, paymentStub);

    return {
        sut,
        paymentMethodRepositoryStub: unitOfWorkRepositoryStub.getPaymentMethodRepository(),
        subscriptionRepositoryStub: unitOfWorkRepositoryStub.getSubscriptionRepository(),
        paymentStub
    };
};

describe("Use case - DeletePaymentMethodUseCase", () => {

    test("Should not delete payment method because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(paymentMethodRepositoryStub, "getPaymentMethodById").mockResolvedValueOnce(null);

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not delete payment method because subscription is renewable", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        const id = "1";
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should delete payment method successfully", async () => {
        const { sut, subscriptionRepositoryStub, paymentStub, paymentMethodRepositoryStub } = makeSut();
        const id = "1";
        const deletePaymentMethodSpy = jest.spyOn(paymentStub, "deletePaymentMethodByToken");
        const deletePaymentMethodByIdSpy = jest.spyOn(paymentMethodRepositoryStub, "deletePaymentMethodById");
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamondNotRenewable());

        await sut.execute({ id });

        expect(deletePaymentMethodSpy).toHaveBeenCalled();
        expect(deletePaymentMethodByIdSpy).toHaveBeenCalled();
    });
});