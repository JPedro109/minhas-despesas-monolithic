import {
    unitOfWorkRepositoryStub,
    testSubscriptionEntity
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
                    subscriptionId: testSubscriptionEntity().id,
                    userId: testSubscriptionEntity().userId,
                    amount: testSubscriptionEntity().amount,
                    active: testSubscriptionEntity().active,
                    renewable: testSubscriptionEntity().renewable,
                    startDate: testSubscriptionEntity().startDate,
                    endDate: testSubscriptionEntity().endDate,
                }
            ]
        );
    });
});