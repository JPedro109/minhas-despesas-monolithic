import {
    ManageSubscriptionRenewalUseCase,
    ForbiddenError,
} from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    ExpenseRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testSubscriptionEntityWithPlanDiamond,
    testSubscriptionEntityWithPlanDiamondNotRenewable,
    testSubscriptionEntityWithPlanFree,
} from "../__mocks__";

const makeSut = (): {
    sut: ManageSubscriptionRenewalUseCase;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
    expenseRepositoryStub: ExpenseRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new ManageSubscriptionRenewalUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
    };
};

describe("Use case - ManageSubscriptionRenewalUseCase", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should not manager the subscription because subscription plan is free", async () => {
        const userId = "2";
        const renew = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanFree());

        const result = sut.execute({ userId, renew });

        await expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not downgrade the plan it has not been expired for so many days to be downgraded", async () => {
        const userId = "1";
        const renew = false;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest.spyOn(Date.prototype, "getUTCFullYear").mockReturnValueOnce(3000);
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValueOnce(1);
        jest.spyOn(Date.prototype, "getUTCDate").mockReturnValueOnce(4);
        const createSubscriptionSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        );
        const updateSubscriptionByIdSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "updateSubscriptionById",
        );

        await sut.execute({ userId, renew });

        expect(createSubscriptionSpy).not.toHaveBeenCalled();
        expect(updateSubscriptionByIdSpy).not.toHaveBeenCalled();
    });

    test("Should downgrade the plan", async () => {
        const userId = "1";
        const renew = false;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(
            testSubscriptionEntityWithPlanDiamondNotRenewable(),
        );
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest.spyOn(Date.prototype, "getUTCFullYear").mockReturnValueOnce(3000);
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValueOnce(1);
        jest.spyOn(Date.prototype, "getUTCDate").mockReturnValueOnce(2);
        const createSubscriptionSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        );
        const updateSubscriptionByIdSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "updateSubscriptionById",
        );

        await sut.execute({ userId, renew });

        expect(createSubscriptionSpy).toHaveBeenCalled();
        expect(updateSubscriptionByIdSpy).toHaveBeenCalled();
    });

    test("Should renew the plan", async () => {
        const userId = "1";
        const renew = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest.spyOn(Date.prototype, "getUTCFullYear").mockReturnValueOnce(3000);
        jest.spyOn(Date.prototype, "getUTCMonth").mockReturnValueOnce(1);
        jest.spyOn(Date.prototype, "getUTCDate").mockReturnValueOnce(2);
        const createSubscriptionSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "createSubscription",
        );
        const updateSubscriptionByIdSpy = jest.spyOn(
            subscriptionRepositoryStub,
            "updateSubscriptionById",
        );

        await sut.execute({ userId, renew });

        expect(createSubscriptionSpy).toHaveBeenCalled();
        expect(updateSubscriptionByIdSpy).toHaveBeenCalled();
    });
});
