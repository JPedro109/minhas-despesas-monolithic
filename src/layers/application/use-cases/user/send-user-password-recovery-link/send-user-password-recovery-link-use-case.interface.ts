import { SendUserPasswordRecoveryLinkDTO } from "./send-user-password-recovery-link.dtos";

export interface ISendUserPasswordRecoveryLinkUseCase {
    execute(dto: SendUserPasswordRecoveryLinkDTO): Promise<string>;
}