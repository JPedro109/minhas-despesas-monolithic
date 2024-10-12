import { SendUserEmailUpdateLinkDTO } from "./send-user-email-update-link.dtos";

export interface ISendUserEmailUpdateLinkUseCase {
    execute(dto: SendUserEmailUpdateLinkDTO): Promise<string>;
}