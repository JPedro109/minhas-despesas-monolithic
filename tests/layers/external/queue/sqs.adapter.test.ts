import { SQSAdapter } from "@/layers/external";

describe("External - SQSAdapter", () => {
    test("Should send message | sendMessage", async () => {
        const queue = "Test";
        const object = { name: "test" };
        const sut = new SQSAdapter();
        const sendMessageSpy = jest.spyOn(sut, "sendMessage");

        await sut.sendMessage(queue, object);

        expect(sendMessageSpy).toHaveBeenCalled();
        expect(sendMessageSpy).toHaveBeenCalledWith(queue, object);
    });
});
