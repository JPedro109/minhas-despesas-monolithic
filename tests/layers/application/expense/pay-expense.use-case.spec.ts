import { DomainError } from "@/layers/domain";
import { PayExpenseUseCase, NotFoundError } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    PaymentHistoryRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    testExpenseEntityPaid,
} from "../__mocks__";

const makeSut = (): {
    sut: PayExpenseUseCase;
    expenseRepositoryStub: ExpenseRepositoryStub;
    paymentHistoryRepositoryStub: PaymentHistoryRepositoryStub;
} => {
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new PayExpenseUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub: unitOfWorkRepositoryStub.getExpenseRepository(),
        paymentHistoryRepositoryStub:
            unitOfWorkRepositoryStub.getPaymentHistoryRepository(),
    };
};

describe("Use case - PayExpenseUseCase", () => {
    test("Should not paid because expense does not exist", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "2";
        jest.spyOn(
            expenseRepositoryStub,
            "getExpenseById",
        ).mockResolvedValueOnce(null);

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not paid because expense is already paid", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const id = "1";
        jest.spyOn(
            expenseRepositoryStub,
            "getExpenseById",
        ).mockResolvedValueOnce(testExpenseEntityPaid());

        const result = sut.execute({ id });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should mark expense as paid and create a payment history", async () => {
        const { sut, expenseRepositoryStub, paymentHistoryRepositoryStub } =
            makeSut();
        const updateExpenseByIdSpy = jest.spyOn(
            expenseRepositoryStub,
            "updateExpenseById",
        );
        const createPaymentHistorySpy = jest.spyOn(
            paymentHistoryRepositoryStub,
            "createPaymentHistory",
        );
        const id = "1";

        await sut.execute({ id });

        expect(updateExpenseByIdSpy).toHaveBeenCalled();
        expect(createPaymentHistorySpy).toHaveBeenCalled();
    });
});
