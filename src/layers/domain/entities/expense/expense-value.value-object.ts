import { InvalidExpenseValueError } from "./errors/invalid-expense-value.error";

export class ExpenseValueValueObject {
    private constructor(private readonly expenseValue: number) { }

    public get value(): number {
        return this.expenseValue;
    }

    static create(expenseValue: number): ExpenseValueValueObject | InvalidExpenseValueError {
        if (!this.validate(expenseValue)) return new InvalidExpenseValueError();

        return new ExpenseValueValueObject(expenseValue);
    }

    private static validate(expenseValue: number): boolean {
        if (expenseValue <= 0) return false;

        return true;
    }
}