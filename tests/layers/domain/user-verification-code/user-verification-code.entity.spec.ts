import { UserVerificationCodeEntity, DomainError, UserEntity } from "@/layers/domain";

const user = new UserEntity(
    {
        email: "email@test.com",
        username: "username",
        password: "Password1234",
        verifiedEmail: true
    }
);

describe("Entity - UserVerificationCode", () => {
    
    test("Should not create UserVerificationCodeEntity, because verification code is null", () => {
        const type = "verify_user_email";
        const invalidVerificationCode = "";
        const verificationCodeExpiryDate = new Date();
        const valid = true;

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type, 
            verificationCode: invalidVerificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create UserVerificationCodeEntity, because verification code is invalid", () => {
        const type = "verify_user_email";
        const invalidVerificationCode = "1234567";
        const verificationCodeExpiryDate = new Date();
        const valid = true;

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type, 
            verificationCode: invalidVerificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create UserVerificationCodeEntity, because verification code type is empty", () => {
        const invalidTypeName = "" as "verify_user_email";
        const verificationCode = "123456";
        const verificationCodeExpiryDate = new Date();
        const valid = true;

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: invalidTypeName, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create UserVerificationCodeEntity, because verification code type is invalid", () => {
        const invalidTypeName = "invalid_type" as "verify_user_email";
        const verificationCode = "123456";
        const valid = true;
        const verificationCodeExpiryDate = new Date();

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: invalidTypeName, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should create UserVerificationCodeEntity", () => {
        const type = "verify_user_email";
        const verificationCode = "123456";
        const verificationCodeExpiryDate = new Date();
        const valid = true;

        const sut = new UserVerificationCodeEntity({
            type, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        expect(sut).toBeInstanceOf(UserVerificationCodeEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.type).toBe(type);
        expect(sut.verificationCode).toBe(verificationCode);
        expect(sut.verificationCodeExpiryDate).toBe(verificationCodeExpiryDate);
        expect(sut.valid).toBe(valid);
        expect(sut.user).toEqual(user);
        expect(sut.createdAt).not.toBeUndefined();
        expect(sut.updatedAt).toBeUndefined();
    });

    test("Should not update valid status, because code is already invalid", () => {
        const type = "verify_user_email";
        const verificationCode = "123456";
        const verificationCodeExpiryDate = new Date();
        const valid = false;
        const userVerificationCode = new UserVerificationCodeEntity({
            type, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        const sut = (): boolean => userVerificationCode.valid = true;

        expect(sut).toThrow(DomainError);
    });

    test("Should not update valid status, because already is active", () => {
        const type = "verify_user_email";
        const verificationCode = "123456";
        const verificationCodeExpiryDate = new Date();
        const valid = true;
        const userVerificationCode = new UserVerificationCodeEntity({
            type, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        const sut = (): boolean => userVerificationCode.valid = true;

        expect(sut).toThrow(DomainError);
    });

    test("Should update valid status", () => {
        const type = "verify_user_email";
        const verificationCode = "123456";
        const verificationCodeExpiryDate = new Date();
        const valid = true;
        const userVerificationCode = new UserVerificationCodeEntity({
            type, 
            verificationCode,
            verificationCodeExpiryDate,
            valid,
            user
        });

        userVerificationCode.valid = false;

        expect(userVerificationCode.valid).toBe(false);
    });
});