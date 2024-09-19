import { ExpenseNameValueObject, InvalidExpenseNameError } from "@/layers/domain";

describe("Value Object - ExpenseNameValueObject", () => {
    
    test("Should not create ExpenseNameValueObject, because value is null", () => {
        const invalidExpenseName = "";

        const sut = ExpenseNameValueObject.create(invalidExpenseName);

        expect(sut).toBeInstanceOf(InvalidExpenseNameError);
    });

    test("Should not create ExpenseNameValueObject, because value has more than 60 characters", () => {
        const invalidExpenseName = "c".repeat(61);

        const sut = ExpenseNameValueObject.create(invalidExpenseName);

        expect(sut).toBeInstanceOf(InvalidExpenseNameError);
    });

    test("Should create ExpenseNameValueObject", () => {
        const expenseName = "expense";

        const sut = ExpenseNameValueObject.create(expenseName) as unknown as ExpenseNameValueObject;

        expect(sut).toBeInstanceOf(ExpenseNameValueObject);
        expect(sut.value).toBe(expenseName);
    });
});