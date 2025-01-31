import {
    NotFoundError,
    GetUserSubscriptionUseCase,
} from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    UserRepositoryStub,
    paymentStubFactory,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserSubscriptionUseCase;
    userRepositoryStub: UserRepositoryStub;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new GetUserSubscriptionUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

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
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.execute({ userId });

        expect(result).not.toBeNull();
    });
});
