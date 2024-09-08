import { InvalidExpenseDueDateError } from "./errors/invalid-expense-due-date.error";

export class ExpenseDueDateValueObject {
    private readonly expenseDueDate: Date;
  
    private constructor(dueDate: Date) {
      this.expenseDueDate = dueDate;
    }
  
    public get value(): Date {
      return this.expenseDueDate;
    }
  
    static create(dueDate: Date): ExpenseDueDateValueObject | InvalidExpenseDueDateError {
      if (!this.validate(dueDate)) return new InvalidExpenseDueDateError();
    
      return new ExpenseDueDateValueObject(dueDate);
    }
  
    private static validate(dueDate: Date): boolean {
      const currentDate = new Date();
    
      if (currentDate.getTime() >= dueDate.getTime()) return false;
    
      return true;
    }
} 