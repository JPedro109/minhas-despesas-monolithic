import { UpdateUserEmailDTO } from "./update-user-email.dtos";

export interface IUpdateUserEmailUseCase {
    execute(dto: UpdateUserEmailDTO): Promise<string>;
}