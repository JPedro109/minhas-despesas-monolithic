import {
    CryptographyStub,
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
    UnitOfWorkRepositoryStub,
    UserConsentRepositoryStub,
    CustomerRepositoryStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    testUserVerificationCodeEntityWithDateExpired
} from "../__mocks__";
import { InvalidParamError, RecoverUserPasswordUseCase } from "@/layers/application";

const makeSut = (): {
    sut: RecoverUserPasswordUseCase,
    userRepositoryStub: UserRepositoryStub,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub,
    cryptographyStub: CryptographyStub
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
    const cryptographyStub = new CryptographyStub();
    const sut = new RecoverUserPasswordUseCase(unitOfWorkRepositoryStub, cryptographyStub);

    return {
        sut,
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
        cryptographyStub
    };
};

describe("Use case - RecoverUserPasswordUseCase", () => {

    test("Should not recover password because passwords do not match", async () => {
        const code = "123456";
        const password = "NewPassword123";
        const invalidPasswordConfirm = "DifferentPassword123";
        const { sut } = makeSut();

        const result = sut.execute({
            code,
            password,
            passwordConfirm: invalidPasswordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because verification code is invalid", async () => {
        const code = "000001";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(null));

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because verification code is expired", async () => {
        const code = "123457";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityWithDateExpired));

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not recover password because new password is equal to the old password", async () => {
        const code = "123456";
        const password = "OldPassword123";
        const passwordConfirm = "OldPassword123";
        const { sut } = makeSut();

        const result = sut.execute({
            code,
            password,
            passwordConfirm
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should recover password successfully", async () => {
        const code = "123456";
        const password = "NewPassword123";
        const passwordConfirm = "NewPassword123";
        const { sut, cryptographyStub } = makeSut();
        jest
            .spyOn(cryptographyStub, "compareHash")
            .mockReturnValueOnce(Promise.resolve(false));

        const result = await sut.execute({
            code,
            password,
            passwordConfirm
        });

        expect(result).toBe("email@teste.com");
    });
});