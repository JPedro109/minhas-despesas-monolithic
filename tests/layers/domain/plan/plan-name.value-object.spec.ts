import { PlanNameValueObject, InvalidPlanNameError } from "@/layers/domain";

describe(("Value Object - PlanNameValueObject"), () => {
    
	test("Should not create PlanNameValueObject, because plan name is empty" , () => {
		const invalidPlanName = "";

		const sut = PlanNameValueObject.create(invalidPlanName);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should not create PlanNameValueObject, because the plan name has more than 50 characters" , () => {
		const invalidPlanName = "c".repeat(51);

		const sut = PlanNameValueObject.create(invalidPlanName);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should create PlanNameValueObject" , () => {
		const planName = "plan name";

		const sut = PlanNameValueObject.create(planName) as unknown as PlanNameValueObject;

		expect(sut).toBeInstanceOf(PlanNameValueObject);
		expect(sut.value).toBe(planName);
	});
});