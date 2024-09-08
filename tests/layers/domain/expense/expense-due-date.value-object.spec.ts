import { ExpenseDueDateValueObject, InvalidExpenseDueDateError } from "@/layers/domain";

describe("Value Object - ExpenseDueDateValueObject", () => {
  test("Should not create ExpenseDueDateValueObject, because value date is errored", () => {
    const invalidDate = new Date("2000-01-01");

    const sut = ExpenseDueDateValueObject.create(invalidDate);

    expect(sut).toBeInstanceOf(InvalidExpenseDueDateError);
  });

  test("Should create ExpenseDueDateValueObject", () => {
    const dueDate = new Date("3000-01-01");

    const sut = ExpenseDueDateValueObject.create(dueDate);

    expect(sut).toBeInstanceOf(ExpenseDueDateValueObject);
  });
});