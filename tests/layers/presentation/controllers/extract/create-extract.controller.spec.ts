import { ICreateExtractUseCase } from "@/layers/application";
import { CreateExtractController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: CreateExtractController,
    mockCreateExtractUseCase: jest.Mocked<ICreateExtractUseCase>
} => {
    const mockCreateExtractUseCase: jest.Mocked<ICreateExtractUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new CreateExtractController(
        mockCreateExtractUseCase, 
        logStub
    );

    return {
        sut,
        mockCreateExtractUseCase
    };
};

describe("Controller - CreateExtractController", () => {

    test("Should not create extract because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const referenceMonth = null;
        const referenceYear = null;

        const result = await sut.http({
            data: {
                referenceMonth,
                referenceYear
            },
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should create extract", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const referenceMonth = 2024;
        const referenceYear = 1;

        const result = await sut.http({
            data: {
                referenceMonth,
                referenceYear
            },
            userId
        });

        expect(result.statusCode).toBe(201);
    });
});