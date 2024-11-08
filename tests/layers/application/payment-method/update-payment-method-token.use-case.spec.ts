import {
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStub,
    paymentMethodRepositoryStub
} from "../__mocks__";
import { NotFoundError, UpdatePaymentMethodTokenUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UpdatePaymentMethodTokenUseCase,
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub
} => {
    const sut = new UpdatePaymentMethodTokenUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        paymentMethodRepositoryStub
    };
};

describe("Use case - UpdatePaymentMethodTokenUseCase", () => {

    test("Should not update payment method token because payment method does not exist", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const id = "2";
        const token = "payment_method_updated";
        jest.spyOn(paymentMethodRepositoryStub, "getPaymentMethodById").mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({ id, token });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should update payment method token successfully", async () => {
        const { sut } = makeSut();
        const id = "1";
        const token = "payment_method_updated";

        const result = await sut.execute({ id, token });

        expect(result).toBe(token);
    });
});