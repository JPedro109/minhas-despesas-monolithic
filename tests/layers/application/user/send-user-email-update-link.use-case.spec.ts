import {
    ConflictedError,
    NotFoundError,
    SendUserEmailUpdateLinkUseCase
} from "@/layers/application";
import {
    UserRepositoryStub,
    NotificationStub,
    UserVerificationCodeRepositoryStub,
    unitOfWorkRepositoryStubFactory,
    generationStubFactory,
    notificationStubFactory,
} from "../__mocks__";

const makeSut = (): {
    sut: SendUserEmailUpdateLinkUseCase,
    userRepositoryStub: UserRepositoryStub,
    userVerificationCodeStub: UserVerificationCodeRepositoryStub,
    mailStub: NotificationStub
} => {
    const generationStub = generationStubFactory();
    const mailStub = notificationStubFactory();
    const unitOfWorkRepositoryStub = unitOfWorkRepositoryStubFactory();
    const sut = new SendUserEmailUpdateLinkUseCase(
        unitOfWorkRepositoryStub,
        mailStub,
        generationStub
    );

    return {
        sut,
        userRepositoryStub: unitOfWorkRepositoryStub.getUserRepository(),
        userVerificationCodeStub: unitOfWorkRepositoryStub.getUserVerificationCodeRepository(),
        mailStub
    };
};

describe("Use case - SendUserEmailUpdateLinkUseCase", () => {
    test("Should not send email update link because user does not exist", async () => {
        const { sut, userRepositoryStub } = makeSut();
        const id = "2";
        const email = "newemail@test.com";
        jest.spyOn(userRepositoryStub, "getUserById").mockReturnValueOnce(null);

        const result = sut.execute({
            id,
            email
        });

        await expect(result).rejects.toThrow(NotFoundError);
    });

    test("Should not send email update link because email is already registered", async () => {
        const { sut } = makeSut();
        const id = "1";
        const email = "existingemail@test.com";

        const result = sut.execute({
            id,
            email
        });

        await expect(result).rejects.toThrow(ConflictedError);
    });

    test("Should send email update link successfully", async () => {
        const { sut, userRepositoryStub, userVerificationCodeStub, mailStub } = makeSut();
        const id = "1";
        const email = "newemail@test.com";
        jest.spyOn(userRepositoryStub, "getUserByEmail").mockReturnValueOnce(null);
        const createUserVerificationCodeSpy = jest.spyOn(userVerificationCodeStub, "createUserVerificationCode");
        const sendMailSpy = jest.spyOn(mailStub, "sendMail");

        await sut.execute({
            id,
            email
        });

        expect(createUserVerificationCodeSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
});