import { MailBodyTypeEnum } from "./mail-body-type.enum";

export interface IMail {
	sendMail(to: string, type: MailBodyTypeEnum, props?: object): Promise<void>;
}