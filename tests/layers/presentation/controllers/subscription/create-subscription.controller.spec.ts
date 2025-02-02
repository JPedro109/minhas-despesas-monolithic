import { ICreateSubscriptionUseCase } from "@/layers/application";
import { CreateSubscriptionController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: CreateSubscriptionController;
    mockCreateSubscriptionUseCase: jest.Mocked<ICreateSubscriptionUseCase>;
} => {
    const mockCreateSubscriptionUseCase: jest.Mocked<ICreateSubscriptionUseCase> =
        {
            execute: jest.fn().mockResolvedValue("1"),
        };
    const logStub = logStubFactory();

    const sut = new CreateSubscriptionController(
        mockCreateSubscriptionUseCase,
        logStub,
    );

    return {
        sut,
        mockCreateSubscriptionUseCase,
    };
};

describe("Controller - CreateSubscriptionController", () => {
    test("Should not create user subscription because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const planId = "";

        const result = await sut.http({
            body: {
                planId,
            },
            userId,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get user subscription", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const planId = "1";

        const result = await sut.http({
            body: {
                planId,
            },
            userId,
        });

        expect(result.statusCode).toBe(201);
    });
});
