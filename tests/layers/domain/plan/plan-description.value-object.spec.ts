import {
    PlanDescriptionValueObject,
    InvalidPlanDescriptionError,
} from "@/layers/domain";

describe("Value Object - PlanDescriptionValueObject", () => {
    test("Should not create PlanDescriptionValueObject, because plan description is empty", () => {
        const invalidPlanDescription = "";

        const sut = PlanDescriptionValueObject.create(invalidPlanDescription);

        expect(sut).toBeInstanceOf(InvalidPlanDescriptionError);
    });

    test("Should not create PlanDescriptionValueObject, because the plan description has more than 100 characters", () => {
        const invalidPlanDescription = "c".repeat(101);

        const sut = PlanDescriptionValueObject.create(invalidPlanDescription);

        expect(sut).toBeInstanceOf(InvalidPlanDescriptionError);
    });

    test("Should create PlanDescriptionValueObject", () => {
        const planName = "plan description";

        const sut = PlanDescriptionValueObject.create(
            planName,
        ) as unknown as PlanDescriptionValueObject;

        expect(sut).toBeInstanceOf(PlanDescriptionValueObject);
        expect(sut.value).toBe(planName);
    });
});
