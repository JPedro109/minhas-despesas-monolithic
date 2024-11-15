import { SendNotificationOfExpensesThatAreComingDueUseCase, MailBodyTypeEnum } from "@/layers/application";
import {
    ExpenseRepositoryStub,
    UserRepositoryStub,
    MailStub,
    unitOfWorkRepositoryStub,
    expenseRepositoryStub,
    userRepositoryStub,
    mailStub,
    testUserEntity,
    testExpenseEntityUnpaid
} from "../__mocks__";

const makeSut = (): {
    sut: SendNotificationOfExpensesThatAreComingDueUseCase,
    expenseRepositoryStub: ExpenseRepositoryStub,
    userRepositoryStub: UserRepositoryStub,
    mailStub: MailStub
} => {
    const sut = new SendNotificationOfExpensesThatAreComingDueUseCase(
        unitOfWorkRepositoryStub,
        mailStub
    );

    return {
        sut,
        expenseRepositoryStub,
        userRepositoryStub,
        mailStub
    };
};

describe("Use case - SendNotificationOfExpensesThatAreComingDueUseCase", () => {

    test("Should not send any emails if there are no expenses due soon", async () => {
        const { sut, expenseRepositoryStub, mailStub } = makeSut();
        const sendMailSpy = jest.spyOn(mailStub, "sendMail");
        jest.spyOn(expenseRepositoryStub, "getExpensesByDueDate").mockResolvedValueOnce([]);

        await sut.execute();

        expect(sendMailSpy).not.toHaveBeenCalled();
    });

    test("Should not send any emails if there are no expenses due soon", async () => {
        const { sut, mailStub } = makeSut();
        jest.spyOn(mailStub, "sendMail").mockRejectedValueOnce(new Error());

        const result = sut.execute();

        expect(result).rejects.toThrow(Error);
    });

    test("Should send notification emails for expenses due soon", async () => {
        const { sut, mailStub } = makeSut();
        const sendMailSpy = jest.spyOn(mailStub, "sendMail");

        await sut.execute();

        expect(sendMailSpy).toHaveBeenCalledWith(
            testUserEntity().email,
            MailBodyTypeEnum.NotifyExpenseThatIsDueBody,
            expect.arrayContaining(
                [ 
                    { 
                        expenseName: testExpenseEntityUnpaid().expenseName, 
                        expenseValue: testExpenseEntityUnpaid().expenseValue 
                    } 
                ]
            )
        );
    });
});