import { VerifyUserEmailDTO } from "@/layers/application";

export interface IVerifyUserEmailUseCase {
    execute(dto: VerifyUserEmailDTO): Promise<string>;
}