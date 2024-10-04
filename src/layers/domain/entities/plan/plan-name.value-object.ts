import { InvalidPlanNameError } from "@/layers/domain";

export class PlanNameValueObject {

	private constructor(private readonly planName: string) { }

	public get value(): string {
		return this.planName;
	}

	static create(planName: string): PlanNameValueObject | InvalidPlanNameError {
		if(!this.validate(planName)) return new InvalidPlanNameError();

		return new PlanNameValueObject(planName);
	}

	private static validate(planName: string): boolean {
		if(!planName) return false;

		if(planName.length > 50) return false;

		return true;
	}
}