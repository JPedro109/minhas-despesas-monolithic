import { IDeleteExpiredExtractsUseCase } from "@/layers/application";
import { DeleteExpiredExtractsConstroller } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: DeleteExpiredExtractsConstroller,
    mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IDeleteExpiredExtractsUseCase>
} => {
    const mockExecuteChargeToExpiredSubscriptionUseCase: jest.Mocked<IDeleteExpiredExtractsUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new DeleteExpiredExtractsConstroller(
        mockExecuteChargeToExpiredSubscriptionUseCase, 
        logStub
    );

    return {
        sut,
        mockExecuteChargeToExpiredSubscriptionUseCase
    };
};

describe("Controller - ExecuteChargeToExpiredSubscriptionController", () => {

    test("Should delete expired extracts", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});