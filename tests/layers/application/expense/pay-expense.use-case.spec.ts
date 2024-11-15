import {
    ExpenseRepositoryStub,
    unitOfWorkRepositoryStub,
    expenseRepositoryStub,
    testExpenseEntityPaid
} from "../__mocks__";
import { DomainError } from "@/layers/domain";
import { PayExpenseUseCase, NotFoundError } from "@/layers/application";

const makeSut = (): {
    sut: PayExpenseUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub
} => {
    const sut = new PayExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub
    };
};

describe("Use case - PayExpenseUseCase", () => {

    test("Should not paid because expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(null);

        const result = sut.execute({ id: "2" });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not paid because expense is already paid", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(testExpenseEntityPaid());

        const result = sut.execute({ id: "1" });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should mark expense as paid and create a payment history", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({ id: "1" });

        expect(result).toBe("1");
    });
});