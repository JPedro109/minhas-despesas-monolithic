import { InvalidExpenseNameError } from "./errors/invalid-expense-name.error";

export class ExpenseNameValueObject {
    private readonly expenseName: string;
  
    private constructor(expenseName: string) {
      this.expenseName = expenseName;
    }
  
    public get value(): string {
      return this.expenseName;
    }
  
    static create(expenseName: string): ExpenseNameValueObject | InvalidExpenseNameError {
      if (!this.validate(expenseName))
        return new InvalidExpenseNameError();
    
      return new ExpenseNameValueObject(expenseName);
    }
  
    private static validate(expenseName: string): boolean {
      if (!expenseName) return false;
    
      if (expenseName.length > 60) return false;
    
      return true;
    }
}