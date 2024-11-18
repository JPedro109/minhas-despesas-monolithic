import { DomainError } from "@/layers/domain";
import { ExpenseUndoPaymentUseCase, NotFoundError } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testExpenseEntityPaid,
} from "../__mocks__";

const makeSut = (): {
    sut: ExpenseUndoPaymentUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub,
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new ExpenseUndoPaymentUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
        paymentHistoryRepositoryStub: unitOfWorkRepositoryStub.getPaymentHistoryRepository(),
    };
};

describe("Use case - ExpenseUndoPaymentUseCase", () => {

    test("Should not paid because expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(null);

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not paid because expense is already unpaid", async () => {
        const { sut } = makeSut();
        const id = "1";

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should mark expense as unpaid and delete a payment history", async () => {
        const { sut, expenseRepositoryStub, paymentHistoryRepositoryStub } = makeSut();
        const updateExpenseByIdSpy = jest.spyOn(expenseRepositoryStub, "updateExpenseById");
        const deletePaymentHistoryByExpenseIdAndDueMonthAndDueYearSpy = 
            jest.spyOn(paymentHistoryRepositoryStub, "deletePaymentHistoryByExpenseIdAndDueMonthAndDueYear");
        const id = "1";
        jest.spyOn(expenseRepositoryStub, "getExpenseById").mockResolvedValueOnce(testExpenseEntityPaid());

        await sut.execute({ id });

        expect(updateExpenseByIdSpy).toHaveBeenCalled();
        expect(deletePaymentHistoryByExpenseIdAndDueMonthAndDueYearSpy).toHaveBeenCalled();
    });
});