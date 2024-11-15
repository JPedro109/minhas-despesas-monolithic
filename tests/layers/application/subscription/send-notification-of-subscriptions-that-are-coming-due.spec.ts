import { SendNotificationOfSubscriptionThatAreComingDue, MailBodyTypeEnum } from "@/layers/application";
import {
    SubscriptionRepositoryStub,
    MailStub,
    unitOfWorkRepositoryStub,
    subscriptionRepositoryStub,
    mailStub,
    testUserEntity,
    testPlanFreeEntity,
    testSubscriptionEntity
} from "../__mocks__";

const makeSut = (): {
    sut: SendNotificationOfSubscriptionThatAreComingDue,
    subscriptionRepositoryStub: SubscriptionRepositoryStub,
    mailStub: MailStub
} => {
    const sut = new SendNotificationOfSubscriptionThatAreComingDue(
        unitOfWorkRepositoryStub,
        mailStub
    );

    return {
        sut,
        subscriptionRepositoryStub,
        mailStub
    };
};

describe("Use case - SendNotificationOfSubscriptionThatAreComingDue", () => {

    test("Should not send any emails if there are no expenses due soon", async () => {
        const { sut, subscriptionRepositoryStub, mailStub } = makeSut();
        const sendMailSpy = jest.spyOn(mailStub, "sendMail");
        jest.spyOn(subscriptionRepositoryStub, "getActiveSubscriptionsByEndDate").mockResolvedValueOnce([]);

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
            MailBodyTypeEnum.NotifySubscriptionThatIsDueBody,
            { 
                planName: testPlanFreeEntity().name, 
                value: testSubscriptionEntity().amount 
            } 
        );
    });
});