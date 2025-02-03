import {
    NotFoundError,
    SendUserPasswordRecoveryCodeUseCase,
} from "@/layers/application";
import {
    UserRepositoryStub,
    UserVerificationCodeRepositoryStub,
    NotificationStub,
    unitOfWorkRepositoryStubFactory,
    generationStubFactory,
    notificationStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: SendUserPasswordRecoveryCodeUseCase;
    userRepositoryStub: UserRepositoryStub;
    userVerificationCodeStub: UserVerificationCodeRepositoryStub;
    mailStub: NotificationStub;
} => {
    const generationStub = generationStubFactory();
    const mailStub = notificationStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new SendUserPasswordRecoveryCodeUseCase(
        unitOfWorkRepositoryStub,
        mailStub,
        generationStub,
    );

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        userVerificationCodeStub:
            unitOfWorkRepositoryStub.getUserVerificationCodeRepository(),
        mailStub,
    };
};

describe("Use case - SendUserPasswordRecoveryCodeUseCase", () => {
    test("Should not send password recovery link because email is not registered", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const email = "nonexistentemail@test.com";
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockReturnValueOnce(
            null,
        );

        const result = sut.execute({
            email,
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should send password recovery link successfully", async () => {
        const { sut, userVerificationCodeStub, mailStub } = makeSut();
        const email = "email@teste.com";
        const createUserVerificationCodeSpy = jest.spyOn(
            userVerificationCodeStub,
            "createUserVerificationCode",
        );
        const sendEmailSpy = jest.spyOn(mailStub, "sendEmail");

        await sut.execute({
            email,
        });

        expect(createUserVerificationCodeSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });
});
