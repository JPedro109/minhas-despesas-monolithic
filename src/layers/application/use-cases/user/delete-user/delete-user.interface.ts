import { DeleteUserDTO } from "./delete-user.dtos";

export interface IDeleteUserUseCase {
    execute(dto: DeleteUserDTO): Promise<string>;
}