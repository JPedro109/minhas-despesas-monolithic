import { InvalidExpenseDueDateError } from "./errors/invalid-expense-due-date.error";

export class ExpenseDueDateValueObject {
    private constructor(private readonly expenseDueDate: Date) { }
  
    public get value(): Date {
      return this.expenseDueDate;
    }
  
    static create(expenseDueDate: Date): ExpenseDueDateValueObject | InvalidExpenseDueDateError {
      if (!this.validate(expenseDueDate)) return new InvalidExpenseDueDateError();
    
      return new ExpenseDueDateValueObject(expenseDueDate);
    }
  
    private static validate(expenseDueDate: Date): boolean {
      const currentDate = new Date();
    
      if (currentDate.getTime() >= expenseDueDate.getTime()) return false;
    
      return true;
    }
} 