import {
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    ExpenseRepositoryStub,
    PaymentStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStub,
    paymentStub,
    subscriptionRepositoryStub,
    planRepositoryStub,
    expenseRepositoryStub,
    testPlanGoldEntity,
    testSubscriptionEntityWithPlanGold,
    testSubscriptionEntityWithPlanDiamond,
    testExpenseEntityPaid,
    testSubscriptionEntityWithPlanGoldWithoutAmount,
    paymentMethodRepositoryStub,
} from "../__mocks__";
import { ConflictedError, ForbiddenError, UpdateSubscriptionUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UpdateSubscriptionUseCase,
    planRepositoryStub: PlanRepositoryStub,
    subscriptionRepositoryStub: SubscriptionRepositoryStub,
    expenseRepositoryStub: ExpenseRepositoryStub,
    paymentStub: PaymentStub,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub
} => {
    const sut = new UpdateSubscriptionUseCase(unitOfWorkRepositoryStub, paymentStub);
    return {
        sut,
        planRepositoryStub,
        subscriptionRepositoryStub,
        expenseRepositoryStub,
        paymentStub,
        paymentMethodRepositoryStub
    };
};

describe("Use case - UpdateSubscriptionUseCase", () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Should not update subscription, because user is already on this plan", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            userId: "1",
            newPlanId: "1"
        });

        expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should not update subscription, because subscription is expiry", async () => {
        const { sut } = makeSut();
        jest.spyOn(Date, "now").mockImplementationOnce(() => new Date("4000-01-01").getTime());

        const result = sut.execute({
            userId: "1",
            newPlanId: "1"
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update subscription, because downgrade to Free plan is restricted", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanGold());

        const result = sut.execute({
            userId: "1",
            newPlanId: "1"
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should not update subscription, because there are more expenses than the plan allows", async () => {
        const { sut, subscriptionRepositoryStub, planRepositoryStub, expenseRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(expenseRepositoryStub, "getExpensesByUserId")
            .mockResolvedValueOnce(
                [
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid(),
                    testExpenseEntityPaid()
                ]
            );

        const result = sut.execute({
            userId: "1",
            newPlanId: "2"
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should process subscription downgrade without payment", async () => {
        const { sut, subscriptionRepositoryStub, planRepositoryStub, paymentStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest
            .spyOn(subscriptionRepositoryStub, "createSubscription")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanGoldWithoutAmount());
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(Date.prototype, "getUTCFullYear")
            .mockReturnValueOnce(3000);
        jest
            .spyOn(Date.prototype, "getUTCMonth")
            .mockReturnValueOnce(0);
        jest
            .spyOn(Date.prototype, "getUTCDate")
            .mockReturnValueOnce(2);
        const paySpy = jest
            .spyOn(paymentStub, "pay");

        const result = await sut.execute({
            userId: "1",
            newPlanId: "2"
        });

        expect(result).toBe("4");
        expect(paySpy).not.toHaveBeenCalled();
    });

    test("Should not process subscription downgrade with payment because because payment method does not exists", async () => {
        const { sut, subscriptionRepositoryStub, planRepositoryStub, paymentMethodRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest
            .spyOn(subscriptionRepositoryStub, "createSubscription")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanGold());
        jest
            .spyOn(paymentMethodRepositoryStub, "getPaymentMethodByUserId")
            .mockResolvedValueOnce(null);
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(Date.prototype, "getUTCFullYear")
            .mockReturnValueOnce(3000);
        jest
            .spyOn(Date.prototype, "getUTCMonth")
            .mockReturnValueOnce(0);
        jest
            .spyOn(Date.prototype, "getUTCDate")
            .mockReturnValueOnce(30);

        const result = sut.execute({
            userId: "1",
            newPlanId: "2"
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should process subscription downgrade with payment", async () => {
        const { sut, subscriptionRepositoryStub, planRepositoryStub, paymentStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanDiamond());
        jest
            .spyOn(subscriptionRepositoryStub, "createSubscription")
            .mockResolvedValueOnce(testSubscriptionEntityWithPlanGold());
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(Date.prototype, "getUTCFullYear")
            .mockReturnValueOnce(3000);
        jest
            .spyOn(Date.prototype, "getUTCMonth")
            .mockReturnValueOnce(0);
        jest
            .spyOn(Date.prototype, "getUTCDate")
            .mockReturnValueOnce(30);
        const paySpy = jest
            .spyOn(paymentStub, "pay");

        const result = await sut.execute({
            userId: "1",
            newPlanId: "2"
        });

        expect(result).toBe("2");
        expect(paySpy).toHaveBeenCalled();
    });

    test("Should not process subscription upgrade with payment because because payment method does not exists", async () => {
        const { sut, planRepositoryStub, paymentMethodRepositoryStub } = makeSut();
        jest
            .spyOn(paymentMethodRepositoryStub, "getPaymentMethodByUserId")
            .mockResolvedValueOnce(null);
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(Date.prototype, "getUTCFullYear")
            .mockReturnValueOnce(3000);
        jest
            .spyOn(Date.prototype, "getUTCMonth")
            .mockReturnValueOnce(0);
        jest
            .spyOn(Date.prototype, "getUTCDate")
            .mockReturnValueOnce(15);

        const result = sut.execute({
            userId: "1",
            newPlanId: "3"
        });

        expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should process subscription upgrade with payment", async () => {
        const { sut, planRepositoryStub, paymentStub } = makeSut();
        jest
            .spyOn(planRepositoryStub, "getPlanById")
            .mockResolvedValueOnce(testPlanGoldEntity());
        jest
            .spyOn(Date.prototype, "getUTCFullYear")
            .mockReturnValueOnce(3000);
        jest
            .spyOn(Date.prototype, "getUTCMonth")
            .mockReturnValueOnce(0);
        jest
            .spyOn(Date.prototype, "getUTCDate")
            .mockReturnValueOnce(15);
        const paySpy = jest
            .spyOn(paymentStub, "pay");

        const result = await sut.execute({
            userId: "1",
            newPlanId: "3"
        });

        expect(result).toBe("1");
        expect(paySpy).toHaveBeenCalled();
    });
});