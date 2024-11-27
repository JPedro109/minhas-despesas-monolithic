import { IExecuteChargeToExpiredSubscriptionsUseCase } from "@/layers/application";
import { ExecuteChargeToExpiredSubscriptionsController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: ExecuteChargeToExpiredSubscriptionsController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IExecuteChargeToExpiredSubscriptionsUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IExecuteChargeToExpiredSubscriptionsUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new ExecuteChargeToExpiredSubscriptionsController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - ExecuteChargeToExpiredSubscriptionController", () => {

    test("Should execute charge to expired subscriptions", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});