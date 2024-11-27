import { IGetUserPlanUseCase } from "@/layers/application";
import { GetUserPlanController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: GetUserPlanController,
    mockGetUserPlanUseCase: jest.Mocked<IGetUserPlanUseCase>
} => {
    const mockGetUserPlanUseCase: jest.Mocked<IGetUserPlanUseCase> = {
        execute: jest.fn().mockResolvedValueOnce({
            planId: "1",
            planName: "Name",
            planAmount: 100,
            planDescription: "Description"
        })
    };
    const logStub = logStubFactory();

    const sut = new GetUserPlanController(
        mockGetUserPlanUseCase, 
        logStub
    );

    return {
        sut,
        mockGetUserPlanUseCase
    };
};

describe("Controller - GetUserPlanController", () => {

    test("Should not get plan user because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const renew = undefined;

        const result = await sut.http({
            data: {
                renew
            },
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get plan user", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const renew = true;

        const result = await sut.http({
            data: {
                renew
            },
            userId
        });

        expect(result.statusCode).toBe(200);
    });
});