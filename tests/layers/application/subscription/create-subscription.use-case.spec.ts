import { CreateSubscriptionUseCase, NotFoundError } from "@/layers/application";
import {
    CustomerRepositoryStub,
    PaymentMethodRepositoryStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    PaymentStub,
    paymentStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: CreateSubscriptionUseCase;
    customerRepositoryStub: CustomerRepositoryStub;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
    planRepositoryStub: PlanRepositoryStub;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
    paymentStub: PaymentStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new CreateSubscriptionUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

    return {
        sut,
        customerRepositoryStub:
            unitOfWorkRepositoryStub.getCustomerRepository(),
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
        planRepositoryStub: unitOfWorkRepositoryStub.getPlanRepository(),
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
        paymentStub,
    };
};

describe("Use case - CreateSubscriptionUseCase", () => {
    test("Should throw an error if customer does not exist", async () => {
        const userId = "2";
        const planId = "1";
        const { sut, customerRepositoryStub } = makeSut();
        jest.spyOn(
            customerRepositoryStub,
            "getCustomerByUserId",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ userId, planId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should throw an error if payment method does not exist", async () => {
        const userId = "1";
        const planId = "1";
        const { sut, paymentMethodRepositoryStub } = makeSut();
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ userId, planId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should throw an error if plan does not exist", async () => {
        const userId = "1";
        const planId = "2";
        const { sut, planRepositoryStub } = makeSut();

        jest.spyOn(planRepositoryStub, "getPlanById").mockResolvedValueOnce(
            null,
        );

        const result = sut.execute({ userId, planId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should delete the subscription if repository operation fails", async () => {
        const userId = "1";
        const planId = "1";
        const { sut, subscriptionRepositoryStub, paymentStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        ).mockImplementationOnce(() => {
            throw new Error("Repository Error");
        });
        const deleteSubscriptionSpy = jest.spyOn(
            paymentStub,
            "deleteSubscription",
        );

        const result = sut.execute({ userId, planId });

        await expect(result).rejects.toThrow("Repository Error");
        expect(deleteSubscriptionSpy).toHaveBeenCalled();
    });

    test("Should create a subscription successfully", async () => {
        const userId = "1";
        const planId = "1";
        const { sut, subscriptionRepositoryStub } = makeSut();
        const createSubscriptionSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        );

        await sut.execute({ userId, planId });

        expect(createSubscriptionSpy).toHaveBeenCalled();
    });
});
