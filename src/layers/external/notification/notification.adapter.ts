import { environmentVariables } from "@/shared";
import { INotification, IQueue } from "@/layers/application";

export class NotificationAdapter implements INotification {
    constructor(private readonly queue: IQueue) {}

    async sendEmail(to: string, type: string, props?: object): Promise<void> {
        const email = {
            to,
            type,
            props,
            service: "EXPENSES",
        };

        await this.queue.sendMessage(environmentVariables.sendEmailQueue, {
            pattern: "send_mail",
            data: email,
        });
    }
}
