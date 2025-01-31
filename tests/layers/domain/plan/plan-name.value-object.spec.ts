import {
    PlanNameValueObject,
    PlanNameEnum,
    InvalidPlanNameError,
} from "@/layers/domain";

describe("Value Object - PlanNameValueObject", () => {
    test("Should not create PlanNameValueObject, because plan name is empty", () => {
        const invalidPlanName = "" as PlanNameEnum;

        const sut = PlanNameValueObject.create(invalidPlanName);

        expect(sut).toBeInstanceOf(InvalidPlanNameError);
    });

    test("Should not create PlanNameValueObject, because the plan name has more than 50 characters", () => {
        const invalidPlanName = "c".repeat(51) as PlanNameEnum;

        const sut = PlanNameValueObject.create(invalidPlanName);

        expect(sut).toBeInstanceOf(InvalidPlanNameError);
    });
});
