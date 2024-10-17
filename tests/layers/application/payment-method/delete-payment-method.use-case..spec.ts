import {
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStub,
    paymentMethodRepositoryStub,
    paymentStub
} from "../__mocks__";
import { NotFoundError, DeletePaymentMethodUseCase } from "@/layers/application";

const makeSut = (): {
    sut: DeletePaymentMethodUseCase,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub
} => {
    const sut = new DeletePaymentMethodUseCase(unitOfWorkRepositoryStub, paymentStub);

    return {
        sut,
        paymentMethodRepositoryStub
    };
};

describe("Use case - DeletePaymentMethodUseCase", () => {

    test("Should not delete payment method because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(paymentMethodRepositoryStub, "getPaymentMethodById").mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should delete payment method successfully", async () => {
        const { sut } = makeSut();
        const id = "1";

        const result = await sut.execute({ id });

        expect(result).toBe("Payment Method");
    });
});