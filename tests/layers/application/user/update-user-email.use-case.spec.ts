import {
    CustomerRepositoryStub,
    PaymentStub,
    PlanRepositoryStub,
    recoveryUserPasswordTestUserVerificationCodeEntity,
    SubscriptionRepositoryStub,
    UnitOfWorkRepositoryStub,
    updateUserEmailTestUserVerificationCodeEntity,
    updateUserEmailTestUserVerificationCodeEntityWithDateExpired,
    UserConsentRepositoryStub,
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
} from "../__mocks__";
import {
    InvalidParamError,
    UpdateUserEmailUseCase,
} from "@/layers/application";

const makeSut = (): {
    sut: UpdateUserEmailUseCase,
    userRepositoryStub: UserRepositoryStub,
    userVerificationCodeRepositoryStub: UserVerificationCodeRepositoryStub,
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
    const paymentStub = new PaymentStub();
    const sut = new UpdateUserEmailUseCase(unitOfWorkRepositoryStub, paymentStub);

    return {
        sut,
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
    };
};

describe("Use case - UpdateUserEmailUseCase", () => {
    test("Should not update email because the verification code is invalid", async () => {
        const { sut } = makeSut();

        const result = sut.execute({
            email: "newemail@test.com",
            code: "123457",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code type is invalid", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(recoveryUserPasswordTestUserVerificationCodeEntity));

        const result = sut.execute({
            email: "newemail@test.com",
            code: "123458",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code is expired", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(updateUserEmailTestUserVerificationCodeEntityWithDateExpired));

        const result = sut.execute({
            email: "newemail@test.com",
            code: "000000",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update email successfully", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(updateUserEmailTestUserVerificationCodeEntity));

        const result = await sut.execute({
            email: "newemail@test.com",
            code: "123456",
        });

        expect(result).toBe("newemail@test.com");
    });
});