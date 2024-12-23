import { IPayExpenseUseCase } from "@/layers/application";
import { PayExpenseController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: PayExpenseController,
    mockPayExpenseUseCase: jest.Mocked<IPayExpenseUseCase>
} => {
    const mockPayExpenseUseCase: jest.Mocked<IPayExpenseUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new PayExpenseController(
        mockPayExpenseUseCase,
        logStub
    );

    return {
        sut,
        mockPayExpenseUseCase
    };
};

describe("Controller - PayExpenseController", () => {

    test("Should not pay expense because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        
        const result = await sut.http({
            data: {
                id
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should pay expense", async () => {
        const { sut } = makeSut();
        const id = "1";

        const result = await sut.http({
            data: {
                id
            }
        });

        expect(result.statusCode).toBe(204);
    });
});