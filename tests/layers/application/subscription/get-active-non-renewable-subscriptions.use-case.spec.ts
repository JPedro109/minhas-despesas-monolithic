import { GetActiveNonRenewableSubscriptionsUseCase } from "@/layers/application";
import {
    unitOfWorkRepositoryStubFactory,
    testSubscriptionEntityWithPlanFree
} from "../__mocks__";

const makeSut = (): {
    sut: GetActiveNonRenewableSubscriptionsUseCase,
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetActiveNonRenewableSubscriptionsUseCase(unitOfWorkRepositoryStub);
    
    return {
        sut
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