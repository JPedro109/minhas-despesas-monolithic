import { InvalidPlanDescriptionError } from "@/layers/domain";

export class PlanDescriptionValueObject {

	private constructor(private readonly planDescription: string) { }

	public get value(): string {
		return this.planDescription;
	}

	static create(planDescription: string): PlanDescriptionValueObject | InvalidPlanDescriptionError {
		if(!this.validate(planDescription)) return new InvalidPlanDescriptionError();

		return new PlanDescriptionValueObject(planDescription);
	}

	private static validate(planDescription: string): boolean {
		if(!planDescription) return false;

		if(planDescription.length > 100) return false;

		return true;
	}
}