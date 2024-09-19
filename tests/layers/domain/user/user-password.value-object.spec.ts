import { UserPasswordValueObject, InvalidUserPasswordError } from "@/layers/domain";

describe(("Value Object - UserPasswordValueObject"), () => {
    
	test("Should not create UserPasswordValueObject, because user password is empty" , () => {
		const invalidUserPassword = "";

		const sut = UserPasswordValueObject.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should not create UserPasswordValueObject, because user password is not respect regEx" , () => {
		const invalidUserPassword = "password";

		const sut = UserPasswordValueObject.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should create UserPasswordValueObject" , () => {
		const userPassword = "Password1234";

		const sut = UserPasswordValueObject.create(userPassword);

		expect(sut).toBeInstanceOf(UserPasswordValueObject);
	});

	test("Should create encrypted UserPasswordValueObject" , () => {
		const userPassword = "$2a$12$j4jQ0BWlahJx2twAqeRcL.5eGyw32JSOrA2CnMKW66bKJxm3/blP2";

		const sut = UserPasswordValueObject.create(userPassword);

		expect(sut).toBeInstanceOf(UserPasswordValueObject);
	});
});