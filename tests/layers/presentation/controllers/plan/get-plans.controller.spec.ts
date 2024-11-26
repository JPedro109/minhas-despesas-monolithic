import { IGetPlansUseCase } from "@/layers/application";
import { GetPlansController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: GetPlansController,
    mockGetPlansUseCase: jest.Mocked<IGetPlansUseCase>
} => {
    const mockGetPlansUseCase: jest.Mocked<IGetPlansUseCase> = {
        execute: jest.fn().mockResolvedValue([])
    };
    const logStub = logStubFactory();

    const sut = new GetPlansController(
        mockGetPlansUseCase, 
        logStub
    );

    return {
        sut,
        mockGetPlansUseCase
    };
};

describe("Controller - GetPlansController", () => {

    test("Should get plans", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(200);
    });
});