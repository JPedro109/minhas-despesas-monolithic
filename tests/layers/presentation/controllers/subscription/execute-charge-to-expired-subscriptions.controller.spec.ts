import { IExecuteChargeToExpiredSubscriptions } from "@/layers/application";
import { ExecuteChargeToExpiredSubscriptionsController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: ExecuteChargeToExpiredSubscriptionsController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IExecuteChargeToExpiredSubscriptions>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IExecuteChargeToExpiredSubscriptions> = {
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