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
    SubscriptionRepositoryStub,
} from "../__mocks__";

const makeSut = (): {
    sut: DeletePaymentMethodUseCase;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
    paymentStub: PaymentStub;
    subscriptionRepositoryStub: SubscriptionRepositoryStub;
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
        subscriptionRepositoryStub:
            unitOfWorkRepositoryStub.getSubscriptionRepository(),
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

    test("Should delete payment method successfully without existing subscription", async () => {
        const {
            sut,
            paymentStub,
            paymentMethodRepositoryStub,
            subscriptionRepositoryStub,
        } = makeSut();
        const id = "1";
        jest.spyOn(
            subscriptionRepositoryStub,
            "getSubscriptionByUserId",
        ).mockResolvedValueOnce(null);
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

    test("Should delete payment method successfully with existing subscription", async () => {
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
