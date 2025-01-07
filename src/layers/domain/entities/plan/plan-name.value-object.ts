import { PlanNameEnum, InvalidPlanNameError } from "@/layers/domain";

export class PlanNameValueObject {
    private constructor(private readonly planName: PlanNameEnum) {}

    public get value(): PlanNameEnum {
        return this.planName;
    }

    static create(
        planName: PlanNameEnum,
    ): PlanNameValueObject | InvalidPlanNameError {
        if (!this.validate(planName)) return new InvalidPlanNameError();

        return new PlanNameValueObject(planName);
    }

    private static validate(planName: PlanNameEnum): boolean {
        if (!planName) return false;

        let valid = false;

        for (const key in PlanNameEnum) {
            if (planName === PlanNameEnum[key]) valid = true;
        }

        return valid;
    }
}
