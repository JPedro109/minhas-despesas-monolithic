import { IDeletePaymentMethodUseCase } from "@/layers/application";
import { DeletePaymentMethodController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: DeletePaymentMethodController,
    mockDeletePaymentMethodUseCase: jest.Mocked<IDeletePaymentMethodUseCase>
} => {
    const mockDeletePaymentMethodUseCase: jest.Mocked<IDeletePaymentMethodUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new DeletePaymentMethodController(
        mockDeletePaymentMethodUseCase, 
        logStub
    );

    return {
        sut,
        mockDeletePaymentMethodUseCase
    };
};

describe("Controller - DeletePaymentMethodController", () => {

    test("Should not delete payment method because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";

        const result = await sut.http({
            data: {
                id
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should delete payment method", async () => {
        const { sut } = makeSut();
        const id = "1";

        const result = await sut.http({
            data: {
                id
            }
        });

        expect(result.statusCode).toBe(204);
    });
});