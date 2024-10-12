import {
    CustomerRepositoryStub,
    GenerationStub,
    MailStub,
    PlanRepositoryStub,
    SubscriptionRepositoryStub,
    UnitOfWorkRepositoryStub,
    UserConsentRepositoryStub,
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
} from "../__mocks__";
import {
    NotFoundError,
    SendUserPasswordRecoveryUseCase,
} from "@/layers/application";

const makeSut = (): {
    sut: SendUserPasswordRecoveryUseCase,
    userRepositoryStub: UserRepositoryStub
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
    const generationStub = new GenerationStub();
    const sut = new SendUserPasswordRecoveryUseCase(
        unitOfWorkRepositoryStub,
        mailStub,
        generationStub
    );

    return {
        sut,
        userRepositoryStub
    };
};

describe("Use case - SendUserPasswordRecoveryUseCase", () => {
    test("Should not send password recovery link because email is not registered", async () => {
        const { sut, userRepositoryStub } = makeSut();
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockReturnValueOnce(null);

        const result = sut.execute({
            email: "nonexistentemail@test.com",
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should send password recovery link successfully", async () => {
        const { sut } = makeSut();

        const result = await sut.execute({
            email: "email@teste.com",
        });

        expect(result).toBe("email@teste.com");
    });
});