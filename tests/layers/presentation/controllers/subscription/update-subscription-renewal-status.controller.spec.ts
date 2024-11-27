import { IUpdateSubscriptionRenewalStatusUseCase } from "@/layers/application";
import { UpdateSubscriptionRenewalStatusController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionRenewalStatusController,
    mockUpdateSubscriptionRenewalStatusUseCase: jest.Mocked<IUpdateSubscriptionRenewalStatusUseCase>
} => {
    const mockUpdateSubscriptionRenewalStatusUseCase: jest.Mocked<IUpdateSubscriptionRenewalStatusUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new UpdateSubscriptionRenewalStatusController(
        mockUpdateSubscriptionRenewalStatusUseCase, 
        logStub
    );

    return {
        sut,
        mockUpdateSubscriptionRenewalStatusUseCase
    };
};

describe("Controller - UpdateSubscriptionRenewalStatusController", () => {

    test("Should not update subscription renewal status because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const renewable = undefined;

        const result = await sut.http({
            data: {
                renewable
            },
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update subscription renewal status", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const renewable = true;

        const result = await sut.http({
            data: {
                renewable
            },
            userId
        });

        expect(result.statusCode).toBe(204);
    });
});