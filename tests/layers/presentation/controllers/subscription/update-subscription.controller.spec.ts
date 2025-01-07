import { IUpdateSubscriptionUseCase } from "@/layers/application";
import { UpdateSubscriptionController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateSubscriptionController;
    mockUpdateSubscriptionUseCase: jest.Mocked<IUpdateSubscriptionUseCase>;
} => {
    const mockUpdateSubscriptionUseCase: jest.Mocked<IUpdateSubscriptionUseCase> =
        {
            execute: jest.fn(),
        };
    const logStub = logStubFactory();

    const sut = new UpdateSubscriptionController(
        mockUpdateSubscriptionUseCase,
        logStub,
    );

    return {
        sut,
        mockUpdateSubscriptionUseCase,
    };
};

describe("Controller - UpdateSubscriptionController", () => {
    test("Should not update subscription because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const newPlanId = "";

        const result = await sut.http({
            data: {
                newPlanId,
            },
            userId,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update subscription", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const newPlanId = "1";

        const result = await sut.http({
            data: {
                newPlanId,
            },
            userId,
        });

        expect(result.statusCode).toBe(204);
    });
});
