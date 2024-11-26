import { IDeleteExpiredExtractsUseCase } from "@/layers/application";
import { DeleteExpiredExtractsConstroller } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: DeleteExpiredExtractsConstroller,
    mockDeleteExpiredExtractsUseCase: jest.Mocked<IDeleteExpiredExtractsUseCase>
} => {
    const mockDeleteExpiredExtractsUseCase: jest.Mocked<IDeleteExpiredExtractsUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new DeleteExpiredExtractsConstroller(
        mockDeleteExpiredExtractsUseCase, 
        logStub
    );

    return {
        sut,
        mockDeleteExpiredExtractsUseCase
    };
};

describe("Controller - DeleteExpiredExtractsController", () => {

    test("Should delete expired extracts", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});