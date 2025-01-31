import {
    ForbiddenError,
    NotFoundError,
    UpdateSubscriptionRenewalStatusUseCase,
} from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    PaymentStub,
    paymentStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionRenewalStatusUseCase;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
    paymentStub: PaymentStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new UpdateSubscriptionRenewalStatusUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

    return {
        sut,
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
        paymentStub,
    };
};

describe("Use case - UpdateSubscriptionRenewalStatusUseCase", () => {
    test("Should not update the subscription renewal status because subscription does not exist", async () => {
        const userId = "2";
        const renewable = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "getSubscriptionByUserId",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ userId, renewable });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not update the subscription renewal status because payment method does not exist", async () => {
        const userId = "1";
        const renewable = true;
        const { sut, paymentMethodRepositoryStub } = makeSut();

        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ userId, renewable });

        await expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update if renewable status is false", async () => {
        const userId = "1";
        const renewable = false;
        const { sut, paymentStub } = makeSut();
        jest.spyOn(
            paymentStub,
            "getSubscriptionBySubscriptionExternalId",
        ).mockResolvedValueOnce({
            active: true,
            renewable: false,
            startDate: new Date("3000-01-01"),
            endDate: new Date("3000-02-01"),
        });

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update if renewable status is true", async () => {
        const userId = "1";
        const renewable = true;
        const { sut, paymentStub } = makeSut();
        jest.spyOn(
            paymentStub,
            "getSubscriptionBySubscriptionExternalId",
        ).mockResolvedValueOnce({
            active: true,
            renewable: true,
            startDate: new Date("3000-01-01"),
            endDate: new Date("3000-02-01"),
        });

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should update the subscription renewal status successfully", async () => {
        const userId = "1";
        const renewable = true;
        const { sut, paymentStub } = makeSut();
        jest.spyOn(
            paymentStub,
            "getSubscriptionBySubscriptionExternalId",
        ).mockResolvedValueOnce({
            active: true,
            renewable: false,
            startDate: new Date("3000-01-01"),
            endDate: new Date("3000-02-01"),
        });
        const updateSubscriptionByIdSpy = jest.spyOn(
            paymentStub,
            "updateSubscriptionRenewable",
        );

        await sut.execute({ userId, renewable });

        expect(updateSubscriptionByIdSpy).toHaveBeenCalled();
    });
});
