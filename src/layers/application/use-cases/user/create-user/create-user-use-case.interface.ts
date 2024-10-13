import { CreateUserDTO } from "@/layers/application";

export interface ICreateUserUseCase {
    execute(dto: CreateUserDTO): Promise<string>;
}