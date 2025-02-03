import { EmailTemplateEnum } from "@/layers/application";
import { NotificationAdapter } from "@/layers/external";

describe("External - NotificationAdapter", () => {
    describe("sendEmail", () => {
        test("Should send email with template VerifyUserEmailTemplate", async () => {
            const email = "email@test.com";
            const type = EmailTemplateEnum.VerifyUserEmailTemplate;
            const props = { username: "Test", code: "000000" };
            const sut = new NotificationAdapter();
            jest.spyOn(sut, "sendEmail");

            await sut.sendEmail(email, type, props);

            expect(sut.sendEmail).toHaveBeenCalled();
            expect(sut.sendEmail).toHaveBeenCalledWith(email, type, props);
        });

        test("Should send email with template UpdateUserEmailTemplate", async () => {
            const email = "email@test.com";
            const type = EmailTemplateEnum.UpdateUserEmailTemplate;
            const props = { code: "000000" };
            const sut = new NotificationAdapter();
            jest.spyOn(sut, "sendEmail");

            await sut.sendEmail(email, type, props);

            expect(sut.sendEmail).toHaveBeenCalled();
            expect(sut.sendEmail).toHaveBeenCalledWith(email, type, props);
        });

        test("Should send email with template RecoveryUserPasswordTemplate", async () => {
            const email = "email@test.com";
            const type = EmailTemplateEnum.RecoveryUserPasswordTemplate;
            const props = { code: "000000" };
            const sut = new NotificationAdapter();
            jest.spyOn(sut, "sendEmail");

            await sut.sendEmail(email, type, props);

            expect(sut.sendEmail).toHaveBeenCalled();
            expect(sut.sendEmail).toHaveBeenCalledWith(email, type, props);
        });

        test("Should send email with template VerifyUserEmailTemplate", async () => {
            const email = "email@test.com";
            const type =
                EmailTemplateEnum.NotifySubscriptionPaymentFailureTemplate;
            const props = { username: "Test" };
            const sut = new NotificationAdapter();
            jest.spyOn(sut, "sendEmail");

            await sut.sendEmail(email, type, props);

            expect(sut.sendEmail).toHaveBeenCalled();
            expect(sut.sendEmail).toHaveBeenCalledWith(email, type, props);
        });
    });
});
