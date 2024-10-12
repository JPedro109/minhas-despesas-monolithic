import { RecoverUserPasswordDTO } from "./recover-user-password.dtos";

export interface IRecoverUserPasswordUseCase {
    execute(dto: RecoverUserPasswordDTO): Promise<string>;
}