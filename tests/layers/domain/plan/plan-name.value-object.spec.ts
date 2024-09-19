import { PlanNameValueObject, InvalidPlanNameError } from "@/layers/domain";

describe(("Value Object - PlanNameValueObject"), () => {
    
	test("Should not create plan name, because plan name is empty" , () => {
		const invalidUsername = "";

		const sut = PlanNameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should not create plan name, because the plan name has more than 51 characters" , () => {
		const invalidUsername = "c".repeat(51);

		const sut = PlanNameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidPlanNameError);
	});

	test("Should create plan name" , () => {
		const planName = "plan name";

		const sut = PlanNameValueObject.create(planName);

		expect(sut).toBeInstanceOf(PlanNameValueObject);
	});
});