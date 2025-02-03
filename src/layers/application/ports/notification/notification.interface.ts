import { EmailTemplateEnum } from "./notification.enums";

export interface INotification {
    sendEmail(
        to: string,
        type: EmailTemplateEnum,
        props?: object,
    ): Promise<void>;
}
