import { UsernameValueObject, InvalidUsernameError } from "@/layers/domain";

describe(("Value Object - UsernameValueObject"), () => {
    
	test("Should not create username, because username is empty" , () => {
		const invalidUsername = "";

		const sut = UsernameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create username, because the username has more than 256 characters" , () => {
		const invalidUsername = "c".repeat(300);

		const sut = UsernameValueObject.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create username, because the username has more than 256 characters" , () => {
		const username = "username";

		const sut = UsernameValueObject.create(username);

		expect(sut).toBeInstanceOf(UsernameValueObject);
	});
});