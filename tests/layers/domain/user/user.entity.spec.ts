import {
    UserEntity,
    DomainError,
    InvalidUserEmailError,
    InvalidUserPasswordError,
    InvalidUsernameError,
} from "@/layers/domain";

describe("Entity - User", () => {
    test("Should not create UserEntity, because user email is not valid", () => {
        const invalidEmail = "email.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;

        const sut = (): UserEntity =>
            new UserEntity({
                email: invalidEmail,
                username: username,
                password,
                verifiedEmail,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create UserEntity, because username is not valid", () => {
        const email = "email@test.com";
        const invalidUsername = "";
        const password = "password";
        const verifiedEmail = true;

        const sut = (): UserEntity =>
            new UserEntity({
                email,
                username: invalidUsername,
                password,
                verifiedEmail,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create UserEntity, because user password is not valid", () => {
        const email = "email@test.com";
        const username = "username";
        const invalidUserPassword = "password";
        const verifiedEmail = true;

        const sut = (): UserEntity =>
            new UserEntity({
                email,
                username: username,
                password: invalidUserPassword,
                verifiedEmail,
            });

        expect(sut).toThrow(DomainError);
    });

    test("Should create UserEntity", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;

        const sut = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        expect(sut).toBeInstanceOf(UserEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.email).toBe(email);
        expect(sut.username).toBe(username);
        expect(sut.password).toBe(password);
        expect(sut.verifiedEmail).toBe(verifiedEmail);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });

    test("Should not update email, because it is invalid", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        const sut = (): string => (user.email = "");

        expect(sut).toThrow(InvalidUserEmailError);
    });

    test("Should update email", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        user.email = "email2@test.com";

        expect(user.email).toBe("email2@test.com");
    });

    test("Should not update username, because it is invalid", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        const sut = (): string => (user.username = "");

        expect(sut).toThrow(InvalidUsernameError);
    });

    test("Should update username", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        user.username = "username 2";

        expect(user.username).toBe("username 2");
    });

    test("Should not update password, because it is invalid", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        const sut = (): string => (user.password = "");

        expect(sut).toThrow(InvalidUserPasswordError);
    });

    test("Should update password", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        user.password = "Password12345";

        expect(user.password).toBe("Password12345");
    });

    test("Should not update verified email, because it already is true", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = true;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        const sut = (): boolean => (user.verifiedEmail = true);

        expect(sut).toThrow(DomainError);
    });

    test("Should update verified email", () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const verifiedEmail = false;
        const user = new UserEntity({
            email,
            username: username,
            password,
            verifiedEmail,
        });

        user.verifiedEmail = true;

        expect(user.verifiedEmail).toBeTruthy();
    });
});
