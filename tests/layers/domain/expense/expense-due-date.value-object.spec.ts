import {
    ExpenseDueDateValueObject,
    InvalidExpenseDueDateError,
} from "@/layers/domain";

describe("Value Object - ExpenseDueDateValueObject", () => {
    test("Should not create ExpenseDueDateValueObject, because value date is less than the current date", () => {
        const invalidExpenseDueDate = new Date("2000-01-01");

        const sut = ExpenseDueDateValueObject.create(invalidExpenseDueDate);

        expect(sut).toBeInstanceOf(InvalidExpenseDueDateError);
    });

    test("Should create ExpenseDueDateValueObject", () => {
        const expenseDueDate = new Date("3000-01-01");

        const sut = ExpenseDueDateValueObject.create(
            expenseDueDate,
        ) as unknown as ExpenseDueDateValueObject;

        expect(sut).toBeInstanceOf(ExpenseDueDateValueObject);
        expect(sut.value).toBe(expenseDueDate);
    });
});
