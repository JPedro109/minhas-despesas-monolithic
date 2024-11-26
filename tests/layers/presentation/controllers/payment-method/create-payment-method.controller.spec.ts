import { ICreatePaymentMethodUseCase } from "@/layers/application";
import { CreatePaymentMethodController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: CreatePaymentMethodController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<ICreatePaymentMethodUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<ICreatePaymentMethodUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new CreatePaymentMethodController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - CreatePaymentMethodController", () => {

    test("Should not create payment method because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const token = "";
        const name = "";

        const result = await sut.http({
            data: {
                token,
                name
            },
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should create payment method", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const token = "Token";
        const name = "Payment method";

        const result = await sut.http({
            data: {
                token,
                name
            },
            userId
        });

        expect(result.statusCode).toBe(204);
    });
});