import { EmailTemplateEnum } from "./notification.enums";

export interface INotification {
    sendMail(
        to: string,
        type: EmailTemplateEnum,
        props?: object,
    ): Promise<void>;
}
