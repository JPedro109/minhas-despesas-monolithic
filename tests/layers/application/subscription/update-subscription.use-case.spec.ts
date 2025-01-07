import {
    ConflictedError,
    ForbiddenError,
    UpdateSubscriptionUseCase,
} from "@/layers/application";
import {
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    ExpenseRepositoryStub,
    PaymentStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    paymentStubFactory,
    testPlanGoldEntity,
    testSubscriptionEntityWithPlanGold,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionUseCase;
    planRepositoryStub: PlanRepositoryStub;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
    expenseRepositoryStub: ExpenseRepositoryStub;
    paymentStub: PaymentStub;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
} => {
    const paymentStub = paymentStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdateSubscriptionUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

    return {
        sut,
        planRepositoryStub: unitOfWorkRepositoryStub.getPlanRepository(),
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
        paymentStub,
    };
};

describe("Use case - UpdateSubscriptionUseCase", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should not update subscription, because downgrade to Free plan is restricted", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        const userId = "1";
        const newPlanId = "1";
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanGold());

        const result = sut.execute({
            userId,
            newPlanId,
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update subscription, because user is already on this plan", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const newPlanId = "1";

        const result = sut.execute({
            userId,
            newPlanId,
        });

        expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should not process subscription upgrade with payment because because payment method does not exists", async () => {
        const { sut, planRepositoryStub, paymentMethodRepositoryStub } =
            makeSut();
        const userId = "1";
        const newPlanId = "3";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockResolvedValueOnce(null);
        jest.spyOn(planRepositoryStub, "getPlanById").mockResolvedValueOnce(
            testPlanGoldEntity(),
        );
        jest.spyOn(Date.prototype, "getUTCFullYear").mockReturnValueOnce(3000);
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValueOnce(0);
        jest.spyOn(Date.prototype, "getUTCDate").mockReturnValueOnce(15);

        const result = sut.execute({
            userId,
            newPlanId,
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should process subscription upgrade with payment", async () => {
        const {
            sut,
            planRepositoryStub,
            paymentStub,
            subscriptionRepositoryStub,
        } = makeSut();
        const userId = "1";
        const newPlanId = "3";
        const updateSubscriptionByIdSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "updateSubscriptionById",
        );
        const createSubscriptionSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        );
        jest.spyOn(planRepositoryStub, "getPlanById").mockResolvedValueOnce(
            testPlanGoldEntity(),
        );
        jest.spyOn(Date.prototype, "getUTCFullYear").mockReturnValueOnce(3000);
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValueOnce(0);
        jest.spyOn(Date.prototype, "getUTCDate").mockReturnValueOnce(15);
        const paySpy = jest.spyOn(paymentStub, "pay");

        await sut.execute({
            userId,
            newPlanId,
        });

        expect(updateSubscriptionByIdSpy).toHaveBeenCalled();
        expect(createSubscriptionSpy).toHaveBeenCalled();
        expect(paySpy).toHaveBeenCalled();
    });
});
