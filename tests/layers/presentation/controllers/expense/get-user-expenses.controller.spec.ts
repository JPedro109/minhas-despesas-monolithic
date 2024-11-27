import { IGetUserExpensesUseCase } from "@/layers/application";
import { GetUserExpensesController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: GetUserExpensesController,
    mockGetUserExpensesUseCase: jest.Mocked<IGetUserExpensesUseCase>
} => {
    const mockGetUserExpensesUseCase: jest.Mocked<IGetUserExpensesUseCase> = {
        execute: jest.fn().mockResolvedValue([])
    };
    const logStub = logStubFactory();

    const sut = new GetUserExpensesController(
        mockGetUserExpensesUseCase, 
        logStub
    );

    return {
        sut,
        mockGetUserExpensesUseCase
    };
};

describe("Controller - GetUserExpensesController", () => {

    test("Should not get user expenses because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should get user expenses", async () => {
        const { sut } = makeSut();
        const userId = "1";

        const result = await sut.http({
            userId
        });

        expect(result.statusCode).toBe(200);
    });
});