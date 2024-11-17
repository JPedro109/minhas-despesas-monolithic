import {
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStub,
    SubscriptionRepositoryStub,
    paymentMethodRepositoryStub,
    paymentStub,
    subscriptionRepositoryStub,
    testSubscriptionEntityWithPlanDiamondNotRenewable,
    testSubscriptionEntityWithPlanDiamond,
} from "../__mocks__";
import { NotFoundError, DeletePaymentMethodUseCase, ForbiddenError } from "@/layers/application";

const makeSut = (): {
    sut: DeletePaymentMethodUseCase,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub,
    subscriptionRepositoryStub: SubscriptionRepositoryStub
} => {
    const sut = new DeletePaymentMethodUseCase(unitOfWorkRepositoryStub, paymentStub);

    return {
        sut,
        paymentMethodRepositoryStub,
        subscriptionRepositoryStub
    };
};

describe("Use case - DeletePaymentMethodUseCase", () => {

    test("Should not delete payment method because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(paymentMethodRepositoryStub, "getPaymentMethodById").mockResolvedValueOnce(null);

        const result = sut.execute({ id });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not delete payment method because is not exists subscription active", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        const id = "1";
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(null);

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
        const { sut, subscriptionRepositoryStub } = makeSut();
        const id = "1";
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamondNotRenewable());

        const result = await sut.execute({ id });

        expect(result).toBe("Payment Method");
    });
});