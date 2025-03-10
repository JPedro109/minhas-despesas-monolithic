import {
    NotFoundError,
    UpdatePaymentMethodTokenUseCase,
} from "@/layers/application";
import {
    PaymentMethodRepositoryStub,
    paymentStubFactory,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: UpdatePaymentMethodTokenUseCase;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new UpdatePaymentMethodTokenUseCase(
        unitOfWorkRepositoryStub,
        paymentStubFactory(),
    );

    return {
        sut,
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
    };
};

describe("Use case - UpdatePaymentMethodTokenUseCase", () => {
    test("Should not update payment method token because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        const userId = "1";
        const token = "payment_method_updated";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodById",
        ).mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({ id, userId, token });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not update payment method token because database is failed", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        jest.spyOn(
            paymentMethodRepositoryStub,
            "updatePaymentMethodById",
        ).mockReturnValueOnce(Promise.reject(new Error()));
        const id = "1";
        const userId = "1";
        const token = "payment_method_updated";

        const result = sut.execute({ id, userId, token });

        await expect(result).rejects.toThrow(Error);
    });

    test("Should update payment method token successfully", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const updatePaymentMethodByIdSpy = jest.spyOn(
            paymentMethodRepositoryStub,
            "updatePaymentMethodById",
        );
        const id = "1";
        const userId = "1";
        const token = "payment_method_updated";

        await sut.execute({ id, userId, token });

        expect(updatePaymentMethodByIdSpy).toHaveBeenCalled();
    });
});
