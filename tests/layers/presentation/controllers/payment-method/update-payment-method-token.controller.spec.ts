import { IUpdatePaymentMethodTokenUseCase } from "@/layers/application";
import { UpdatePaymentMethodTokenController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: UpdatePaymentMethodTokenController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IUpdatePaymentMethodTokenUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IUpdatePaymentMethodTokenUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new UpdatePaymentMethodTokenController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - UpdatePaymentMethodTokenController", () => {

    test("Should not update payment method token because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const token = "";

        const result = await sut.http({
            data: {
                id,
                token
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update payment method token", async () => {
        const { sut } = makeSut();
        const id = "1";
        const token = "token";

        const result = await sut.http({
            data: {
                id,
                token
            }
        });

        expect(result.statusCode).toBe(204);
    });
});