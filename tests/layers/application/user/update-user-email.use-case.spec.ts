import {
    CustomerRepositoryStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    testUserVerificationCodeEntityWithDateExpired,
    UnitOfWorkRepositoryStub,
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
    const sut = new UpdateUserEmailUseCase(unitOfWorkRepositoryStub);

    return {
        sut,
        userRepositoryStub,
        userVerificationCodeRepositoryStub,
    };
};

describe("Use case - UpdateUserEmailUseCase", () => {
    test("Should not update email because the verification code is invalid", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest.spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode").mockReturnValueOnce(null);

        const result = sut.execute({
            email: "newemail@test.com",
            code: "123457",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should not update email because the verification code is expired", async () => {
        const { sut, userVerificationCodeRepositoryStub } = makeSut();
        jest
            .spyOn(userVerificationCodeRepositoryStub, "getUserVerificationCodeByVerificationCode")
            .mockReturnValueOnce(Promise.resolve(testUserVerificationCodeEntityWithDateExpired));

        const result = sut.execute({
            email: "newemail@test.com",
            code: "000000",
        });

        await expect(result).rejects.toThrow(InvalidParamError);
    });

    test("Should update email successfully", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            email: "newemail@test.com",
            code: "valid-code",
        });

        expect(result).toBe("newemail@test.com");
    });
});