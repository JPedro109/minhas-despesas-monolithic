import { RecoverUserPasswordDTO } from "@/layers/application";

export interface IRecoverUserPasswordUseCase {
    execute(dto: RecoverUserPasswordDTO): Promise<string>;
}