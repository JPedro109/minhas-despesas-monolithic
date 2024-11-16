import {
    unitOfWorkRepositoryStub,
    testSubscriptionEntityWithPlanFree
} from "../__mocks__";
import { GetActiveNonRenewableSubscriptionsUseCase } from "@/layers/application";

const makeSut = (): {
    sut: GetActiveNonRenewableSubscriptionsUseCase,
} => {
    const sut = new GetActiveNonRenewableSubscriptionsUseCase(unitOfWorkRepositoryStub);
    return {
        sut,
    };
};

describe("Use case - GetActiveNonRenewableSubscriptionsUseCase", () => {

    test("Should get active non-renewable subscriptions", async () => {
        const { sut } = makeSut();

        const result = await sut.execute();

        expect(result).toEqual(
            [
                {
                    subscriptionId: testSubscriptionEntityWithPlanFree().id,
                    userId: testSubscriptionEntityWithPlanFree().userId,
                    amount: testSubscriptionEntityWithPlanFree().amount,
                    active: testSubscriptionEntityWithPlanFree().active,
                    renewable: testSubscriptionEntityWithPlanFree().renewable,
                    startDate: testSubscriptionEntityWithPlanFree().startDate,
                    endDate: testSubscriptionEntityWithPlanFree().endDate,
                }
            ]
        );
    });
});