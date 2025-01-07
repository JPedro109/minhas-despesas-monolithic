import { ICreateExpenseUseCase } from "@/layers/application";
import { CreateExpenseController } from "@/layers/presentation";
import { logStubFactory } from "../../__mocks__";

const makeSut = (): {
    sut: CreateExpenseController;
    mockCreateExpenseUseCase: jest.Mocked<ICreateExpenseUseCase>;
} => {
    const mockCreateExpenseUseCase: jest.Mocked<ICreateExpenseUseCase> = {
        execute: jest.fn().mockResolvedValue("1"),
    };
    const logStub = logStubFactory();

    const sut = new CreateExpenseController(mockCreateExpenseUseCase, logStub);

    return {
        sut,
        mockCreateExpenseUseCase,
    };
};

describe("Controller - CreateExpenseController", () => {
    test("Should not create expense because schema is invalid", async () => {
        const { sut } = makeSut();
        const userId = "";
        const expenseName = "";
        const expenseValue = null;
        const dueDate = "";

        const result = await sut.http({
            data: {
                expenseName,
                expenseValue,
                dueDate,
            },
            userId,
        });

        expect(result.statusCode).toBe(400);
    });

    test("Should create expense", async () => {
        const { sut } = makeSut();
        const userId = "1";
        const expenseName = "Name";
        const expenseValue = 100;
        const dueDate = "3000-01-01";

        const result = await sut.http({
            data: {
                expenseName,
                expenseValue,
                dueDate,
            },
            userId,
        });

        expect(result.statusCode).toBe(201);
    });
});
