import { IUpdatePaymentMethodNameUseCase } from "@/layers/application";
import { UpdatePaymentMethodNameController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: UpdatePaymentMethodNameController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IUpdatePaymentMethodNameUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IUpdatePaymentMethodNameUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new UpdatePaymentMethodNameController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - UpdatePaymentMethodNameController", () => {

    test("Should not update payment method name because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const name = "";

        const result = await sut.http({
            data: {
                id,
                name
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update payment method name", async () => {
        const { sut } = makeSut();
        const id = "1";
        const name = "name";

        const result = await sut.http({
            data: {
                id,
                name
            }
        });

        expect(result.statusCode).toBe(204);
    });
});