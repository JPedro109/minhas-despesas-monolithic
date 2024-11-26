import { IUpdatePreviousMonthPaidExpensesToUnpaidUseCase } from "@/layers/application";
import { UpdatePreviousMonthPaidExpensesToUnpaidController } from "@/layers/presentation";
import { logStubFactory } from "../__mocks__";

const makeSut = (): {
    sut: UpdatePreviousMonthPaidExpensesToUnpaidController,
    mockUpdatePreviousMonthPaidExpensesToUnpaidUseCase: jest.Mocked<IUpdatePreviousMonthPaidExpensesToUnpaidUseCase>
} => {
    const mockUpdatePreviousMonthPaidExpensesToUnpaidUseCase: jest.Mocked<IUpdatePreviousMonthPaidExpensesToUnpaidUseCase> = {
        execute: jest.fn()
    };
    const logStub = logStubFactory();

    const sut = new UpdatePreviousMonthPaidExpensesToUnpaidController(
        mockUpdatePreviousMonthPaidExpensesToUnpaidUseCase,
        logStub
    );

    return {
        sut,
        mockUpdatePreviousMonthPaidExpensesToUnpaidUseCase
    };
};

describe("Controller - UpdatePreviousMonthPaidExpensesToUnpaidController", () => {

    test("Should update previous month paid expenses to unpaid", async () => {
        const { sut } = makeSut();

        const result = await sut.http({});

        expect(result.statusCode).toBe(204);
    });
});