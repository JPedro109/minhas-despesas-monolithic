import { ISendNotificationOfSubscriptionThatAreComingDue } from "@/layers/application";
import { SendNotificationOfSubscriptionThatAreComingDueController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: SendNotificationOfSubscriptionThatAreComingDueController,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<ISendNotificationOfSubscriptionThatAreComingDue>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<ISendNotificationOfSubscriptionThatAreComingDue> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new SendNotificationOfSubscriptionThatAreComingDueController(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - SendNotificationOfSubscriptionThatAreComingDueController", () => {

    test("Should send notification of subscriptions that are coming due ", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});