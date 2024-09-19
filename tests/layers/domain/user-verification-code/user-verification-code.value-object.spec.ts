import { UserVerificationCodeValueObject, InvalidUserVerificationCodeError } from "@/layers/domain";

describe(("Value Object - UserVerificationCodeValueObject"), () => {
    
	test("Should not create UserVerificationCodeValueObject, because user verification code is empty" , () => {
		const invalidUserVerificationCode = "";

		const sut = UserVerificationCodeValueObject.create(invalidUserVerificationCode);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeError);
	});

	test("Should not create UserVerificationCodeValueObject, because the user verification code has more than 6 characters" , () => {
		const invalidUserVerificationCode = "c".repeat(7);

		const sut = UserVerificationCodeValueObject.create(invalidUserVerificationCode);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeError);
	});

	test("Should create UserVerificationCodeValueObject" , () => {
		const userVerificationCode = "123456";

		const sut = UserVerificationCodeValueObject.create(userVerificationCode) as unknown as UserVerificationCodeValueObject;

		expect(sut).toBeInstanceOf(UserVerificationCodeValueObject);
		expect(sut.value).toBe(userVerificationCode);
	});
});