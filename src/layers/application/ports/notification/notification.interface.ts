import { MailBodyTypeEnum } from "./mail-body-type.enum";

export interface INotification {
    sendMail(to: string, type: MailBodyTypeEnum, props?: object): Promise<void>;
}
