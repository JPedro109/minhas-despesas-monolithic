import { UserPasswordValueObject, InvalidUserPasswordError } from "@/layers/domain";

describe(("Value Object - UserPasswordValueObject"), () => {
    
	test("Should not create user password, because password is empty" , () => {
		const invalidUserPassword = "";

		const sut = UserPasswordValueObject.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should not create user password, because password is not respect regEx" , () => {
		const invalidUserPassword = "password";

		const sut = UserPasswordValueObject.create(invalidUserPassword);

		expect(sut).toBeInstanceOf(InvalidUserPasswordError);
	});

	test("Should create user password" , () => {
		const userPassword = "Password1234";

		const sut = UserPasswordValueObject.create(userPassword);

		expect(sut).toBeInstanceOf(UserPasswordValueObject);
	});

	test("Should create user encrypted password" , () => {
		const userPassword = "$2a$12$j4jQ0BWlahJx2twAqeRcL.5eGyw32JSOrA2CnMKW66bKJxm3/blP2";

		const sut = UserPasswordValueObject.create(userPassword);

		expect(sut).toBeInstanceOf(UserPasswordValueObject);
	});
});