import { UserEmailValueObject, InvalidUserEmailError } from "@/layers/domain";

describe("Value Object - UserEmailValueObject", () => {
    test("Should not create UserEmailValueObject, because email is empty", () => {
        const invalidUserEmail = "";

        const sut = UserEmailValueObject.create(invalidUserEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create UserEmailValueObject, because email has more than 255 characters", () => {
        const invalidUserEmail = "c".repeat(256);

        const sut = UserEmailValueObject.create(invalidUserEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create UserEmailValueObject, because email is not respect regEx", () => {
        const invalidUserEmail = "email.com";

        const sut = UserEmailValueObject.create(invalidUserEmail);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create UserEmailValueObject, because the email account has more than 64 characters", () => {
        const invalidUserEmail = "c".repeat(100);

        const sut = UserEmailValueObject.create(`${invalidUserEmail}@test.com`);

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should not create UserEmailValueObject, because the email domain has more than 64 characters", () => {
        const invalidUserEmail = "c".repeat(300);

        const sut = UserEmailValueObject.create(
            `email@${invalidUserEmail}.com`,
        );

        expect(sut).toBeInstanceOf(InvalidUserEmailError);
    });

    test("Should create UserEmailValueObject", () => {
        const userEmail = "email@test.com";

        const sut = UserEmailValueObject.create(userEmail);

        expect(sut).toBeInstanceOf(UserEmailValueObject);
    });
});
