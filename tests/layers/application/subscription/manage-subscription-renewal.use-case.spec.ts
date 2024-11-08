import { NotFoundError, ManageSubscriptionRenewalUseCase } from "@/layers/application";
import {
    unitOfWorkRepositoryStub,
    SubscriptionRepositoryStub,
    subscriptionRepositoryStub
} from "../__mocks__";

const makeSut = (): {
    sut: ManageSubscriptionRenewalUseCase,
    subscriptionRepositoryStub: SubscriptionRepositoryStub
} => {
    const sut = new ManageSubscriptionRenewalUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        subscriptionRepositoryStub
    };
};

describe("Use case - ManageSubscriptionRenewalUseCase", () => {

    test("Should not manager the subscription because subscription does not exist", async () => {
        const userId = "2";
        const renew = true;
        const { sut, subscriptionRepositoryStub } = makeSut();
        jest
            .spyOn(subscriptionRepositoryStub, "getActiveSubscriptionByUserId")
            .mockReturnValueOnce(null);

        const result = sut.execute({ userId, renew });

        expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not renew subscription", async () => {
        const userId = "1";
        const renew = false;
        const { sut } = makeSut();

        const result = await sut.execute({ userId, renew });

        expect(result).toBe("1");
    });

    test("Should renew subscription", async () => {
        const userId = "1";
        const renew = true;
        const { sut } = makeSut();

        const result = await sut.execute({ userId, renew });

        expect(result).toBe("1");
    });
});