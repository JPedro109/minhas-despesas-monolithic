import { UserVerificationCodeValueObject, InvalidUserVerificationCodeError } from "@/layers/domain";

describe(("Value Object - UserVerificationCodeValueObject"), () => {
    
	test("Should not create user verification code, because user verification code is empty" , () => {
		const invalidUserVerificationCode = "";

		const sut = UserVerificationCodeValueObject.create(invalidUserVerificationCode);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeError);
	});

	test("Should not create user verification code, because the user verification code has more than 6 characters" , () => {
		const invalidUserVerificationCode = "c".repeat(7);

		const sut = UserVerificationCodeValueObject.create(invalidUserVerificationCode);

		expect(sut).toBeInstanceOf(InvalidUserVerificationCodeError);
	});

	test("Should not create user verification code, because the user verification code has more than 256 characters" , () => {
		const userVerificationCode = "123456";

		const sut = UserVerificationCodeValueObject.create(userVerificationCode);

		expect(sut).toBeInstanceOf(UserVerificationCodeValueObject);
	});
});