import {
    CryptographyStub,
    GenerationStub,
    MailStub,
    PaymentStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    CustomerRepositoryStub,
    UserConsentRepositoryStub,
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
    UnitOfWorkRepositoryStub
} from "../__mocks__";
import { ConflictedError, InvalidParamError, CreateUserUseCase } from "@/layers/application";
import { DomainError } from "@/layers/domain";

const makeSut = (): {
    sut: CreateUserUseCase,
    userRepositoryStub: UserRepositoryStub,
    customerRepositoryStub: CustomerRepositoryStub,
    mailStub: MailStub
} => {
    const userRepositoryStub = new UserRepositoryStub();
    const userConsentRepositoryStub = new UserConsentRepositoryStub();
    const userVerificationCodeRepositoryStub = new UserVerificationCodeRepositoryStub();
    const customerRepositoryStub = new CustomerRepositoryStub();
    const planRepositoryStub = new PlanRepositoryStub();
    const subscriptionRepositoryStub = new SubscriptionRepositoryStub();
    const unitOfWorkRepositoryStub = new UnitOfWorkRepositoryStub(
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
        customerRepositoryStub,
        planRepositoryStub,
        subscriptionRepositoryStub,
        userConsentRepositoryStub
    );
    const mailStub = new MailStub();
    const cryptographyStub = new CryptographyStub();
    const generationStub = new GenerationStub();
    const paymentStub = new PaymentStub();
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