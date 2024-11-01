import { DeleteExpenseUseCase, NotFoundError } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStub,
    expenseRepositoryStub,
    paymentHistoryRepositoryStub
} from "../__mocks__";

const makeSut = (): {
    sut: DeleteExpenseUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub,
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub
} => {
    const sut = new DeleteExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub,
        paymentHistoryRepositoryStub
    };
};

describe("Use case - DeleteExpenseUseCase", () => {

    test("Should not delete expense expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = false;
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(null);

        const result = sut.execute({ id, deleteExpensePaymentHistory });

        expect(result).rejects.toBeInstanceOf(NotFoundError);
    });

    test("Should delete expense by id", async () => {
        const { sut } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = false;

        const result = await sut.execute({ id, deleteExpensePaymentHistory });

        expect(result).toBe("1");
    });

    test("Should delete expense and its payment history if deleteExpensePaymentHistory is true", async () => {
        const { sut } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = true;

        const result = await sut.execute({ id, deleteExpensePaymentHistory });

        expect(result).toBe("1");
    });
});