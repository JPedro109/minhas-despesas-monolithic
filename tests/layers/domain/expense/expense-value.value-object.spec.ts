import {
    ExpenseValueValueObject,
    InvalidExpenseValueError,
} from "@/layers/domain";

describe("Value Object - ExpenseValueValueObject", () => {
    test("Should not create ExpenseValueValueObject, because value is less than zero", () => {
        const invalidExpenseValue = -1;

        const sut = ExpenseValueValueObject.create(invalidExpenseValue);

        expect(sut).toBeInstanceOf(InvalidExpenseValueError);
    });

    test("Should create ExpenseValueValueObject", () => {
        const expenseValue = 1;

        const sut = ExpenseValueValueObject.create(
            expenseValue,
        ) as unknown as ExpenseValueValueObject;

        expect(sut).toBeInstanceOf(ExpenseValueValueObject);
        expect(sut.value).toBe(expenseValue);
    });
});
