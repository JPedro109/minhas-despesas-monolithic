import {
    NotFoundError,
    GetUserSubscriptionUseCase,
} from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    UserRepositoryStub,
    testSubscriptionEntityWithPlanDiamond,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserSubscriptionUseCase;
    userRepositoryStub: UserRepositoryStub;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetUserSubscriptionUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
    };
};

describe("Use case - GetUserSubscriptionUseCase", () => {
    test("Should not get user subscription because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "2";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({ userId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should get user subscription successfully", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        const userId = "1";
        jest.spyOn(
            subscriptionRepositoryStub,
            "getActiveSubscriptionByUserId",
        ).mockResolvedValue(testSubscriptionEntityWithPlanDiamond());

        const result = await sut.execute({ userId });

        expect(result).toEqual({
            subscriptionId: testSubscriptionEntityWithPlanDiamond().id,
            userId: testSubscriptionEntityWithPlanDiamond().userId,
            amount: testSubscriptionEntityWithPlanDiamond().amount,
            active: testSubscriptionEntityWithPlanDiamond().active,
            renewable: testSubscriptionEntityWithPlanDiamond().renewable,
            startDate: testSubscriptionEntityWithPlanDiamond().startDate,
            endDate: testSubscriptionEntityWithPlanDiamond().endDate,
            plan: {
                planId: testSubscriptionEntityWithPlanDiamond().plan.id,
                name: testSubscriptionEntityWithPlanDiamond().plan.name,
                amount: testSubscriptionEntityWithPlanDiamond().plan.amount,
                description:
                    testSubscriptionEntityWithPlanDiamond().plan.description,
                durationInDays:
                    testSubscriptionEntityWithPlanDiamond().plan.durationInDays,
                actions:
                    testSubscriptionEntityWithPlanDiamond().plan.actions.map(
                        (action) => ({
                            actionId: action.id,
                            name: action.name,
                            description: action.description,
                        }),
                    ),
            },
        });
    });
});
