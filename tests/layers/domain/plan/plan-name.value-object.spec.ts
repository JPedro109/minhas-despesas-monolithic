import { PlanNameValueObject, InvalidPlanNameError } from "@/layers/domain";

describe(("Value Object - PlanNameValueObject"), () => {
    
	test("Should not create PlanNameValueObject, because plan name is empty" , () => {
		const invalidUsername = "";

		const sut = PlanNameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should not create PlanNameValueObject, because the plan name has more than 50 characters" , () => {
		const invalidUsername = "c".repeat(51);

		const sut = PlanNameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should create PlanNameValueObject" , () => {
		const planName = "plan name";

		const sut = PlanNameValueObject.create(planName);

		expect(sut).toBeInstanceOf(PlanNameValueObject);
	});
});