import { ISendNotificationOfExpensesThatAreComingDueUseCase } from "@/layers/application";
import { SendNotificationOfExpensesThatAreComingDueController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: SendNotificationOfExpensesThatAreComingDueController,
    mockSendNotificationOfExpensesThatAreComingDueUseCase: jest.Mocked<ISendNotificationOfExpensesThatAreComingDueUseCase>
} => {
    const mockSendNotificationOfExpensesThatAreComingDueUseCase: jest.Mocked<ISendNotificationOfExpensesThatAreComingDueUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new SendNotificationOfExpensesThatAreComingDueController(
        mockSendNotificationOfExpensesThatAreComingDueUseCase,
        logStub
    );

    return {
        sut,
        mockSendNotificationOfExpensesThatAreComingDueUseCase
    };
};

describe("Controller - SendNotificationOfExpensesThatAreComingDueController", () => {

    test("Should send notification of expenses that are coming due payment", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});