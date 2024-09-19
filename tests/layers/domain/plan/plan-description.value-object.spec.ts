import { PlanDescriptionValueObject, InvalidPlanDescriptionError } from "@/layers/domain";

describe(("Value Object - PlanDescriptionValueObject"), () => {
    
	test("Should not create plan description, because plan description is empty" , () => {
		const invalidPlanDescription = "";

		const sut = PlanDescriptionValueObject.create(invalidPlanDescription);

		expect(sut).toBeInstanceOf(InvalidPlanDescriptionError);
	});

	test("Should not create plan description, because the plan description has more than 100 characters" , () => {
		const invalidPlanDescription = "c".repeat(101);

		const sut = PlanDescriptionValueObject.create(invalidPlanDescription);

		expect(sut).toBeInstanceOf(InvalidPlanDescriptionError);
	});

	test("Should create plan description" , () => {
		const planName = "plan description";

		const sut = PlanDescriptionValueObject.create(planName);

		expect(sut).toBeInstanceOf(PlanDescriptionValueObject);
	});
});