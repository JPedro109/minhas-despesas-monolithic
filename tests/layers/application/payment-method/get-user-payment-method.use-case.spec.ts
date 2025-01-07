import {
    NotFoundError,
    GetUserPaymentMethodUseCase,
} from "@/layers/application";
import {
    UserRepositoryStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testPaymentMethodEntity,
} from "../__mocks__";

const makeSut = (): {
    sut: GetUserPaymentMethodUseCase;
    userRepositoryStub: UserRepositoryStub;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new GetUserPaymentMethodUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
    };
};

describe("Use case - GetUserPaymentMethodUseCase", () => {
    test("Should not get user payment method because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "3";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({ userId });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should get null", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const userId = "2";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockResolvedValueOnce(null);

        const result = await sut.execute({ userId });

        expect(result).toBeNull();
    });

    test("Should get user payment method successfully", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.execute({ userId });

        expect(result).toEqual({
            userId: testPaymentMethodEntity().userId,
            name: testPaymentMethodEntity().name,
            token: testPaymentMethodEntity().token,
        });
    });
});
