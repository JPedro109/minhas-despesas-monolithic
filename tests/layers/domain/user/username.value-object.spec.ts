import { Username, InvalidUsernameError } from "@/layers/domain";

describe(("Object Value - Username"), () => {
    
	test("Should not create username, because username is empty" , () => {
		const invalidUsername = "";

		const sut = Username.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create username, because the username has more than 256 characters" , () => {
		const invalidUsername = "c".repeat(300);

		const sut = Username.create(invalidUsername);

		expect(sut).toBeInstanceOf(InvalidUsernameError);
	});

	test("Should not create username, because the username has more than 256 characters" , () => {
		const username = "username";

		const sut = Username.create(username);

		expect(sut).toBeInstanceOf(Username);
	});
});