import { SendUserPasswordRecoveryLinkDTO } from "@/layers/application";

export interface ISendUserPasswordRecoveryLinkUseCase {
    execute(dto: SendUserPasswordRecoveryLinkDTO): Promise<string>;
}