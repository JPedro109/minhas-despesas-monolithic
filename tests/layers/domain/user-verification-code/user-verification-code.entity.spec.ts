import { UserVerificationCodeEntity, DomainError, UserEntity } from "@/layers/domain";

const user = new UserEntity(
    {
        email: "email@test.com",
        username: "username",
        password: "Password1234",
        verifiedEmail: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
);

describe("Entity - UserVerificationCode", () => {
    
    test("Should not create user verification code, because verification code is null", () => {
        const invalidVerificationCode = "";
        const typeName = "email";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode: invalidVerificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create user verification code, because verification code is invalid", () => {
        const invalidVerificationCode = "1234567";
        const typeName = "email";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode: invalidVerificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create user verification code, because verification code type is null", () => {
        const verificationCode = "123456";
        const invalidTypeName = "";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName: invalidTypeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should not create user verification code, because verification code type is invalid", () => {
        const verificationCode = "123456";
        const invalidTypeName = "c".repeat(16);
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();

        const sut = (): UserVerificationCodeEntity => new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName: invalidTypeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        expect(sut).toThrow(DomainError);
    });

    test("Should create user verification code", () => {
        const verificationCode = "123456";
        const typeName = "email";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();

        const sut = new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        expect(sut).toBeInstanceOf(UserVerificationCodeEntity);
    });

    test("Should not update valid status, because code is already invalid", () => {
        const verificationCode = "123456";
        const typeName = "email";
        const expiryDate = new Date();
        const valid = false;
        const createdAt = new Date();
        const userVerificationCode = new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        const sut = (): boolean => userVerificationCode.valid = true;

        expect(sut).toThrow(DomainError);
    });

    test("Should not update valid status, because already is active", () => {
        const verificationCode = "123456";
        const typeName = "email";
        const expiryDate = new Date();
        const valid = true;
        const createdAt = new Date();
        const userVerificationCode = new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        const sut = (): boolean => userVerificationCode.valid = true;

        expect(sut).toThrow(DomainError);
    });

    test("Should update valid status", () => {
        const verificationCode = "123456";
        const typeName = "email";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();
        const userVerificationCode = new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        userVerificationCode.valid = false;

        expect(userVerificationCode.valid).toBe(false);
    });

    test("Should update updatedAt", () => {
        const verificationCode = "123456";
        const typeName = "email";
        const valid = true;
        const expiryDate = new Date();
        const createdAt = new Date();
        const userVerificationCode = new UserVerificationCodeEntity({
            type: {
                id: "1",
                typeName,
                createdAt: new Date()
            }, 
            verificationCode,
            verificationCodeExpiryDate: expiryDate,
            valid,
            user,
            createdAt
        });

        const newUpdatedAt = new Date();
        userVerificationCode.updatedAt = newUpdatedAt;

        expect(userVerificationCode.updatedAt).toBe(newUpdatedAt);
    });
});