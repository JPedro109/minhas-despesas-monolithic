import { ExpenseValueValueObject, InvalidExpenseValueError } from "@/layers/domain";

describe("Value Object - ExpenseValueValueObject", () => {
  test("Should not create ExpenseValue, because value is less than zero", () => {
    const InvalidExpenseValue = -1;

    const sut = ExpenseValueValueObject.create(InvalidExpenseValue);

    expect(sut).toBeInstanceOf(InvalidExpenseValueError);
  });

  test("Should create ExpenseValueValueObject", () => {
    const expenseValue = 1;

    const sut = ExpenseValueValueObject.create(expenseValue);

    expect(sut).toBeInstanceOf(ExpenseValueValueObject);
  });
});