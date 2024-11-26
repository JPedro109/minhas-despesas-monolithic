import { IExpenseUndoPaymentUseCase } from "@/layers/application";
import { ExpenseUndoPaymentController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: ExpenseUndoPaymentController,
    mockExpenseUndoPaymentUseCase: jest.Mocked<IExpenseUndoPaymentUseCase>
} => {
    const mockExpenseUndoPaymentUseCase: jest.Mocked<IExpenseUndoPaymentUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new ExpenseUndoPaymentController(
        mockExpenseUndoPaymentUseCase,
        logStub
    );

    return {
        sut,
        mockExpenseUndoPaymentUseCase
    };
};

describe("Controller - ExpenseUndoPaymentController", () => {

    test("Should not expense undo payment because schema is invalid", async () => {
        const { sut } = makeSut();
        const id = "";
        
        const result = await sut.http({
            data: {
                id
            }
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should expense undo payment", async () => {
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