import { SendUserPasswordRecoveryCodeDTO } from "@/layers/application";

export interface ISendUserPasswordRecoveryCodeUseCase {
    execute(dto: SendUserPasswordRecoveryCodeDTO): Promise<void>;
}
