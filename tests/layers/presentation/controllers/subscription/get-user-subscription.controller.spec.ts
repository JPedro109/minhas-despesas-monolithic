import { IGetUserSubscriptionUseCase } from "@/layers/application";
import { GetUserSubscriptionController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: GetUserSubscriptionController,
    mockGetUserSubscriptionUseCase: jest.Mocked<IGetUserSubscriptionUseCase>
} => {
    const mockGetUserSubscriptionUseCase: jest.Mocked<IGetUserSubscriptionUseCase> = {
        execute: jest.fn().mockResolvedValue({
            subscriptionId: "1",
            userId: "1",
            amount: "amount",
            active: "active",
            renewable: "renewable",
            startDate: "startDate",
            endDate: "endDate",
            plan: {
                planId: "Name",
                name: "Name",
                amount: 100,
                description: "Desc",
                durationInDays: 30,
                actions: [
                    {
                        actionId: "1",
                        name: "Name",
                        description: "Desc"
                    }
                ]
            }
        })
    };
    const logStub = logStubFactory();

    const sut = new GetUserSubscriptionController(
        mockGetUserSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockGetUserSubscriptionUseCase
    };
};

describe("Controller - GetUserSubscriptionController", () => {

    test("Should not get user subscription because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get user subscription", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(200);
    });
});