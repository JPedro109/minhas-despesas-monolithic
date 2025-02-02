import { IDeleteExpenseUseCase } from "@/layers/application";
import { DeleteExpenseController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: DeleteExpenseController;
    mockDeleteExpenseUseCase: jest.Mocked<IDeleteExpenseUseCase>;
} => {
    const mockDeleteExpenseUseCase: jest.Mocked<IDeleteExpenseUseCase> = {
        execute: jest.fn(),
    };
    const logStub = logStubFactory();

    const sut = new DeleteExpenseController(mockDeleteExpenseUseCase, logStub);

    return {
        sut,
        mockDeleteExpenseUseCase,
    };
};

describe("Controller - DeleteExpenseController", () => {
    test("Should not delete expense because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        const deleteExpensePaymentHistory = undefined;

        const result = await sut.http({
            params: { id },
            query: {
                deleteExpensePaymentHistory,
            },
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should delete expense and delete payment history", async () => {
        const { sut } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = "false";

        const result = await sut.http({
            params: { id },
            query: {
                deleteExpensePaymentHistory,
            },
        });

        expect(result.statusCode).toBe(204);
    });

    test("Should delete expense", async () => {
        const { sut } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = "true";

        const result = await sut.http({
            params: { id },
            query: {
                deleteExpensePaymentHistory,
            },
        });

        expect(result.statusCode).toBe(204);
    });
});
