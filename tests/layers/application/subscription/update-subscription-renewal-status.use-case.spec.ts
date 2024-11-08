import { DomainError } from "@/layers/domain";
import { NotFoundError, UpdateSubscriptionRenewalStatusUseCase } from "@/layers/application";
import {
    unitOfWorkRepositoryStub,
    SubscriptionRepositoryStub,
    subscriptionRepositoryStub
} from "../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionRenewalStatusUseCase,
    subscriptionRepositoryStub: SubscriptionRepositoryStub
} => {
    const sut = new UpdateSubscriptionRenewalStatusUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        subscriptionRepositoryStub
    };
};

describe("Use case - UpdateSubscriptionRenewalStatusUseCase", () => {

    test("Should not update the subscription renewal status because subscription does not exist", async () => {
        const userId = "2";
        const renewable = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockReturnValueOnce(null);

        const result = sut.execute({ userId, renewable });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not update if renewable status is already the same", async () => {
        const userId = "1";
        const renewable = true;
        const { sut } = makeSut();

        const result = sut.execute({ userId, renewable });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should update the subscription renewal status successfully", async () => {
        const userId = "1";
        const renewable = false;
        const { sut } = makeSut();

        const result = await sut.execute({ userId, renewable });

        expect(result).toBe("1");
    });
});