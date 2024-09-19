import { InvalidPlanAmountError } from "./errors/invalid-plan-amount.error";

export class PlanAmountValueObject {
    private constructor(private readonly planAmount: number) { }

    public get value(): number {
        return this.planAmount;
    }

    static create(planAmount: number): PlanAmountValueObject | InvalidPlanAmountError {
        if (!this.validate(planAmount)) return new InvalidPlanAmountError();

        return new PlanAmountValueObject(planAmount);
    }

    private static validate(planAmount: number): boolean {
        if (planAmount < 0) return false;

        return true;
    }
}