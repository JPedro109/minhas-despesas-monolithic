import { IGetUserExtractsUseCase } from "@/layers/application";
import { GetUserExtractsController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: GetUserExtractsController;
    mockGetUserExtractsUseCase: jest.Mocked<IGetUserExtractsUseCase>;
} => {
    const mockGetUserExtractsUseCase: jest.Mocked<IGetUserExtractsUseCase> = {
        execute: jest.fn().mockResolvedValue([]),
    };
    const logStub = logStubFactory();

    const sut = new GetUserExtractsController(
        mockGetUserExtractsUseCase,
        logStub,
    );

    return {
        sut,
        mockGetUserExtractsUseCase,
    };
};

describe("Controller - GetUserExtractsController", () => {
    test("Should not get user extracts because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";

        const result = await sut.http({
            userId,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get user extracts", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.http({
            userId,
        });

        expect(result.statusCode).toBe(200);
    });
});
