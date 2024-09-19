import { PlanAmountValueObject, InvalidPlanAmountError } from "@/layers/domain";

describe("Value Object - PlanAmountValueObject", () => {

    test("Should not create PlanAmountValueObject, because value is less than zero", () => {
        const invalidExpenseValue = -1;
      
        const sut = PlanAmountValueObject.create(invalidExpenseValue);
      
        expect(sut).toBeInstanceOf(InvalidPlanAmountError);
    });
  
    test("Should create PlanAmountValueObject", () => {
      const expenseValue = 1;
    
      const sut = PlanAmountValueObject.create(expenseValue) as unknown as PlanAmountValueObject;
    
      expect(sut).toBeInstanceOf(PlanAmountValueObject);
      expect(sut.value).toBe(expenseValue);
    });
});