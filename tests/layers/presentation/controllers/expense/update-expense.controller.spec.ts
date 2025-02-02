import { IUpdateExpenseUseCase } from "@/layers/application";
import { UpdateExpenseController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: UpdateExpenseController;
    mockUpdateExpenseUseCase: jest.Mocked<IUpdateExpenseUseCase>;
} => {
    const mockUpdateExpenseUseCase: jest.Mocked<IUpdateExpenseUseCase> = {
        execute: jest.fn(),
    };
    const logStub = logStubFactory();

    const sut = new UpdateExpenseController(mockUpdateExpenseUseCase, logStub);

    return {
        sut,
        mockUpdateExpenseUseCase,
    };
};

describe("Controller - UpdateExpenseController", () => {
    test("Should not update expense because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const id = "";
        const expenseName = "";
        const expenseValue = null;
        const dueDate = "";

        const result = await sut.http({
            params: { id },
            body: {
                expenseName,
                expenseValue,
                dueDate,
            },
            userId,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should update expense", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const id = "1";
        const expenseName = "Name";
        const expenseValue = 100;
        const dueDate = "3000-01-01";

        const result = await sut.http({
            params: { id },
            body: {
                expenseName,
                expenseValue,
                dueDate,
            },
            userId,
        });

        expect(result.statusCode).toBe(204);
    });
});
