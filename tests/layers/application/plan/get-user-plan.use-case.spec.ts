import {
    unitOfWorkRepositoryStub,
    SubscriptionRepositoryStub,
    subscriptionRepositoryStub,
    testPlanFreeEntity
} from "../__mocks__";
import { GetUserPlanUseCase, NotFoundError } from "@/layers/application";

const makeSut = (): {
    sut: GetUserPlanUseCase,
    subscriptionRepositoryStub: SubscriptionRepositoryStub,
} => {
    const sut = new GetUserPlanUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        subscriptionRepositoryStub
    };
};

describe("Use case - GetUserPlanUseCase", () => {

    test("Should throw an error if the plan associated with the subscription is not found", async () => {
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest.spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId").mockReturnValueOnce(null);

        const result = sut.execute({ userId: "2" });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should return the active plan details successfully", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({ userId: "1" });

        expect(result).toEqual({
            planId: testPlanFreeEntity().id,
            planAmount: testPlanFreeEntity().amount,
            planDescription: testPlanFreeEntity().description,
            planName: testPlanFreeEntity().name,
        });
    });
});