import {
    unitOfWorkRepositoryStub,
    expenseRepositoryStub,
    ExpenseRepositoryStub
} from "../__mocks__";
import { UpdatePreviousMonthPaidExpensesToUnpaidUseCase } from "@/layers/application";

const makeSut = (): {
    sut: UpdatePreviousMonthPaidExpensesToUnpaidUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub
} => {
    const sut = new UpdatePreviousMonthPaidExpensesToUnpaidUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        expenseRepositoryStub
    };
};

describe("Use case - UpdatePreviousMonthPaidExpensesToUnpaidUseCase", () => {

    test("Should update paid expenses from the previous month to unpaid", async () => {
        const { sut, expenseRepositoryStub } = makeSut();
        const previousMonth = new Date().getUTCMonth() - 1;
        const updatePaidExpensesToUnpaidSpy = jest
            .spyOn(expenseRepositoryStub, "updatePaidExpensesToUnpaidAndSumOneInDueDateMonthByDueDateMonth");

        await sut.execute();

        expect(updatePaidExpensesToUnpaidSpy).toHaveBeenCalledWith(previousMonth);
    });
});