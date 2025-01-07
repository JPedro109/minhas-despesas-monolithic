import { DeleteExpenseUseCase, NotFoundError } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: DeleteExpenseUseCase;
    expenseRepositoryStub: ExpenseRepositoryStub;
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new DeleteExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
        paymentHistoryRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentHistoryRepository(),
    };
};

describe("Use case - DeleteExpenseUseCase", () => {
    test("Should not delete expense expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "1";
        const deleteExpensePaymentHistory = false;
        jest.spyOn(
            expenseRepositoryStub,
            "getExpenseById",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ id, deleteExpensePaymentHistory });

        await expect(result).rejects.toBeInstanceOf(NotFoundError);
    });

    test("Should delete expense by id", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const deleteExpenseByIdSpy = jest.spyOn(
            expenseRepositoryStub,
            "deleteExpenseById",
        );
        const id = "1";
        const deleteExpensePaymentHistory = false;

        await sut.execute({ id, deleteExpensePaymentHistory });

        expect(deleteExpenseByIdSpy).toHaveBeenCalled();
    });

    test("Should delete expense and its payment history if deleteExpensePaymentHistory is true", async () => {
        const { sut, expenseRepositoryStub, paymentHistoryRepositoryStub } =
            makeSut();
        const deleteExpenseByIdSpy = jest.spyOn(
            expenseRepositoryStub,
            "deleteExpenseById",
        );
        const deletePaymentHistoriesByExpenseId = jest.spyOn(
            paymentHistoryRepositoryStub,
            "deletePaymentHistoriesByExpenseId",
        );
        const id = "1";
        const deleteExpensePaymentHistory = true;

        await sut.execute({ id, deleteExpensePaymentHistory });

        expect(deleteExpenseByIdSpy).toHaveBeenCalled();
        expect(deletePaymentHistoriesByExpenseId).toHaveBeenCalled();
    });
});
