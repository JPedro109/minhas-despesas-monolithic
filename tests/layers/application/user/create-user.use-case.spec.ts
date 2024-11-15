import {
    MailStub,
    CustomerRepositoryStub,
    UserRepositoryStub,
    unitOfWorkRepositoryStub,
    mailStub,
    cryptographyStub,
    generationStub,
    paymentStub,
    userRepositoryStub,
    customerRepositoryStub
} from "../__mocks__";
import { DomainError } from "@/layers/domain";
import { ConflictedError, InvalidParamError, CreateUserUseCase } from "@/layers/application";

const makeSut = (): {
    sut: CreateUserUseCase,
    userRepositoryStub: UserRepositoryStub,
    customerRepositoryStub: CustomerRepositoryStub,
    mailStub: MailStub
} => {
    const sut = new CreateUserUseCase(unitOfWorkRepositoryStub, mailStub, cryptographyStub, generationStub, paymentStub);

    return {
        sut,
        userRepositoryStub,
        customerRepositoryStub,
        mailStub
    };
};

describe("Use case - CreateUserUseCase", () => {

    test("Should not create user, because the user rules are not respected", async () => {
        const email = "invalid-email";
        const username = "u".repeat(300);
        const password = "password";
        const passwordConfirm = "password";
        const { sut } = makeSut();

        const result = sut.execute({
            email,
            username,
            password,
            passwordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        await expect(result).rejects.toThrow(DomainError);
    });

    test("Should not create user, because passwords do not match", async () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const invalidPasswordConfirm = "Password123456";
        const { sut } = makeSut();

        const result = sut.execute({
            email,
            username,
            password,
            passwordConfirm: invalidPasswordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not create user, because email already exists", async () => {
        const email = "email@used.com";
        const username = "username";
        const password = "Password1234";
        const passwordConfirm = "Password1234";
        const { sut } = makeSut();

        const result = sut.execute({
            email,
            username,
            password,
            passwordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        await expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should not create user, because create customer is failed", async () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const passwordConfirm = "Password1234";
        const { sut, userRepositoryStub, customerRepositoryStub } = makeSut();
        jest
            .spyOn(userRepositoryStub, "getUserByEmail")
            .mockReturnValueOnce(null);
        jest
            .spyOn(customerRepositoryStub, "createCustomer")
            .mockReturnValueOnce(Promise.reject(new Error()));

        const result = sut.execute({
            email,
            username,
            password,
            passwordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        await expect(result).rejects.toThrow(Error);
    });

    test("Should not create user, because send mail is failed", async () => {
        const email = "email@used.com";
        const username = "username";
        const password = "Password1234";
        const passwordConfirm = "Password1234";
        const { sut, userRepositoryStub, mailStub } = makeSut();
        jest
            .spyOn(userRepositoryStub, "getUserByEmail")
            .mockReturnValueOnce(Promise.resolve(null));
        jest
            .spyOn(mailStub, "sendMail")
            .mockReturnValueOnce(Promise.reject(new Error()));

        const result = sut.execute({
            email,
            username,
            password,
            passwordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        await expect(result).rejects.toThrow(Error);
    });

    test("Should create user successfully", async () => {
        const email = "email@test.com";
        const username = "username";
        const password = "Password1234";
        const passwordConfirm = "Password1234";
        const { sut, userRepositoryStub } = makeSut();
        jest
        .spyOn(userRepositoryStub, "getUserByEmail")
        .mockReturnValueOnce(null);

        const result = await sut.execute({
            email,
            username,
            password,
            passwordConfirm,
            consentVersion: "1.0",
            userAgent: "Mozilla",
            ipAddress: "127.0.0.1"
        });

        expect(result).toBe(email);
    });
});