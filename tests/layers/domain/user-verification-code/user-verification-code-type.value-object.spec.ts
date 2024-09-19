import { UserVerificationCodeTypeValueObject, InvalidUserVerificationCodeTypeError } from "@/layers/domain";

describe(("Value Object - UserVerificationCodeTypeValueObject"), () => {
    
	test("Should not create UserVerificationCodeTypeValueObject, because user verification code type is empty" , () => {
		const invalidUserVerificationCodeTypeName = "";

		const sut = UserVerificationCodeTypeValueObject.create(invalidUserVerificationCodeTypeName);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should not create UserVerificationCodeTypeValueObject, because the user verification code type is invalid" , () => {
		const invalidUserVerificationCodeTypeName = "invalid_type";

		const sut = UserVerificationCodeTypeValueObject.create(invalidUserVerificationCodeTypeName);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeTypeError);
	});

	test("Should create UserVerificationCodeTypeValueObject" , () => {
		const userVerificationCodeTypeName = "create_user";

		const sut = UserVerificationCodeTypeValueObject.create(userVerificationCodeTypeName) as unknown as UserVerificationCodeTypeValueObject;

		expect(sut).toBeInstanceOf(UserVerificationCodeTypeValueObject);
		expect(sut.value).toBe(userVerificationCodeTypeName);
	});
});