import { UsernameValueObject, InvalidUsernameError } from "@/layers/domain";

describe("Value Object - UsernameValueObject", () => {
    test("Should not create UsernameValueObject, because username is empty", () => {
        const invalidUsername = "";

        const sut = UsernameValueObject.create(invalidUsername);

        expect(sut).toBeInstanceOf(InvalidUsernameError);
    });

    test("Should not create UsernameValueObject, because the username has more than 255 characters", () => {
        const invalidUsername = "c".repeat(256);

        const sut = UsernameValueObject.create(invalidUsername);

        expect(sut).toBeInstanceOf(InvalidUsernameError);
    });

    test("Should create UsernameValueObject", () => {
        const username = "username";

        const sut = UsernameValueObject.create(username);

        expect(sut).toBeInstanceOf(UsernameValueObject);
    });
});
