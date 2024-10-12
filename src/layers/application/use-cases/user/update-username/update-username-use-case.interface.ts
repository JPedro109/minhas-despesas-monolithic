import { UpdateUsernameDTO } from "./update-username.dtos";

export interface IUpdateUsernameUseCase {
    execute(dto: UpdateUsernameDTO): Promise<string>;
}