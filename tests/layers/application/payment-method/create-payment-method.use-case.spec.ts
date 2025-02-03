import {
    NotFoundError,
    ConflictedError,
    CreatePaymentMethodUseCase,
} from "@/layers/application";
import {
    UserRepositoryStub,
    PaymentMethodRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    paymentStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: CreatePaymentMethodUseCase;
    userRepositoryStub: UserRepositoryStub;
    paymentMethodRepositoryStub: PaymentMethodRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const paymentStub = paymentStubFactory();
    const sut = new CreatePaymentMethodUseCase(
        unitOfWorkRepositoryStub,
        paymentStub,
    );

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        paymentMethodRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentMethodRepository(),
    };
};

describe("Use case - CreatePaymentMethodUseCase", () => {
    test("Should not create payment method because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const userId = "2";
        const name = "Payment Method";
        const token = "payment_token";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(
            Promise.resolve(null),
        );

        const result = sut.execute({ userId, name, token });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not create payment method because payment method with same name already exists", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const name = "Existing Payment Method";
        const token = "payment_token";

        const result = sut.execute({ userId, name, token });

        await expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should not create payment method because database is failed", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const userId = "1";
        const name = "Payment Method";
        const token = "payment_token";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockReturnValueOnce(Promise.resolve(null));
        jest.spyOn(
            paymentMethodRepositoryStub,
            "createPaymentMethod",
        ).mockReturnValueOnce(Promise.reject(new Error()));

        const result = sut.execute({ userId, name, token });

        await expect(result).rejects.toThrow(Error);
    });

    test("Should create payment method successfully", async () => {
        const { sut, paymentMethodRepositoryStub } = makeSut();
        const userId = "1";
        const name = "Payment Method";
        const token = "payment_token";
        jest.spyOn(
            paymentMethodRepositoryStub,
            "getPaymentMethodByUserId",
        ).mockReturnValueOnce(Promise.resolve(null));

        const result = await sut.execute({ userId, name, token });

        expect(typeof result).toBe("string");
    });
});
