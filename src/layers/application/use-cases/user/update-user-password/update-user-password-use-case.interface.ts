import { UpdateUserPasswordDTO } from "./update-user-password.dtos";

export interface IUpdateUserPasswordUseCase {
    execute(dto: UpdateUserPasswordDTO): Promise<string>;
}