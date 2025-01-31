import {
    NotFoundError,
    DeletePaymentMethodUseCase,
    ForbiddenError,
} from "@/layers/application";
import {
    PaymentStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    paymentStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: DeletePaymentMethodUseCase;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
    paymentStub: PaymentStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new DeletePaymentMethodUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

    return {
        sut,
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),

        paymentStub,
    };
};

describe("Use case - DeletePaymentMethodUseCase", () => {
    test("Should not delete payment method because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodById",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not delete payment method because subscription is renewable", async () => {
        const { sut, paymentStub } = makeSut();
        jest.spyOn(
            paymentStub,
            "getSubscriptionBySubscriptionExternalId",
        ).mockResolvedValueOnce({
            active: true,
            renewable: true,
            startDate: new Date("3000-01-01"),
            endDate: new Date("3000-02-01"),
        });
        const id = "1";

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(ForbiddenError);
    });

    test("Should delete payment method successfully", async () => {
        const { sut, paymentStub, paymentMethodRepositoryStub } = makeSut();
        const id = "1";
        const deletePaymentMethodSpy = jest.spyOn(
            paymentStub,
            "detachmentPaymentMethodInCustomerByToken",
        );
        const deletePaymentMethodByIdSpy = jest.spyOn(
            paymentMethodRepositoryStub,
            "deletePaymentMethodById",
        );

        await sut.execute({ id });

        expect(deletePaymentMethodSpy).toHaveBeenCalled();
        expect(deletePaymentMethodByIdSpy).toHaveBeenCalled();
    });
});
