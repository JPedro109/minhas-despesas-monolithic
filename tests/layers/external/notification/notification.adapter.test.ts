import { NotificationAdapter, SQSAdapter } from "@/layers/external";

describe("External - NotificationAdapter", () => {
    test("Should send email | sendEmail", async () => {
        const email = "email@test.com";
        const type = "Test";
        const props = { name: "Test" };
        const queueAdapter = new SQSAdapter();
        const sut = new NotificationAdapter(queueAdapter);
        jest.spyOn(sut, "sendMail");

        await sut.sendMail(email, type, props);

        expect(sut.sendMail).toHaveBeenCalled();
        expect(sut.sendMail).toHaveBeenCalledWith(email, type, props);
    });
});
