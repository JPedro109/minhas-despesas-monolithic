import { IGetUserPaymentMethodUseCase } from "@/layers/application";
import { GetUserPaymentMethodController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: GetUserPaymentMethodController,
    mockGetUserPaymentMethodUseCase: jest.Mocked<IGetUserPaymentMethodUseCase>
} => {
    const mockGetUserPaymentMethodUseCase: jest.Mocked<IGetUserPaymentMethodUseCase> = {
        execute: jest.fn().mockResolvedValue({
            userId: "1",
            name: "Payment method",
            token: "token"
        })
    };
    const logStub = logStubFactory();

    const sut = new GetUserPaymentMethodController(
        mockGetUserPaymentMethodUseCase, 
        logStub
    );

    return {
        sut,
        mockGetUserPaymentMethodUseCase
    };
};

describe("Controller - GetUserPaymentMethodController", () => {

    test("Should not get user payment method because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get user payment method", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(200);
    });
});