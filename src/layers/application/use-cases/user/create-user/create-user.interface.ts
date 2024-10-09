import { CreateUserDTO } from "./create-user.dtos";

export interface ICreateUserUseCase {
    execute(dto: CreateUserDTO): Promise<string>;
}