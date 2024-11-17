import { DomainError } from "@/layers/domain";
import { ForbiddenError, NotFoundError, UpdateSubscriptionRenewalStatusUseCase } from "@/layers/application";
import {
    unitOfWorkRepositoryStub,
    SubscriptionRepositoryStub,
    PaymentMethodRepositoryStub,
    subscriptionRepositoryStub,
    paymentMethodRepositoryStub,
    testSubscriptionEntityWithPlanDiamondNotRenewable
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionRenewalStatusUseCase,
    subscriptionRepositoryStub: SubscriptionRepositoryStub,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub
} => {
    const sut = new UpdateSubscriptionRenewalStatusUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        subscriptionRepositoryStub,
        paymentMethodRepositoryStub
    };
};

describe("Use case - UpdateSubscriptionRenewalStatusUseCase", () => {

    test("Should not update the subscription renewal status because subscription does not exist", async () => {
        const userId = "2";
        const renewable = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(null);

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not update the subscription renewal status because subscription plan is FREE", async () => {
        const userId = "1";
        const renewable = true;
        const { sut } = makeSut();

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update the subscription renewal status because payment method does not exist", async () => {
        const userId = "1";
        const renewable = true;
        const { sut, subscriptionRepositoryStub, paymentMethodRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamondNotRenewable());
        jest
            .spyOn(paymentMethodRepositoryStub, "getPaymentMethodByUserId")
            .mockResolvedValueOnce(null);

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update if renewable status is already the same", async () => {
        const userId = "1";
        const renewable = false;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamondNotRenewable());

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(DomainError);
    });

    test("Should update the subscription renewal status successfully", async () => {
        const userId = "1";
        const renewable = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamondNotRenewable());

        const result = await sut.execute({ userId, renewable });

        expect(result).toBe("5");
    });
});