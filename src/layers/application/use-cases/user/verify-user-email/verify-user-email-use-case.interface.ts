import { VerifyUserEmailDTO } from "./verify-user-email.dtos";

export interface IVerifyUserEmailUseCase {
    execute(dto: VerifyUserEmailDTO): Promise<string>;
}