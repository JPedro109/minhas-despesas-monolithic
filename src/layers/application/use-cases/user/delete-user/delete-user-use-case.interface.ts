import { DeleteUserDTO } from "@/layers/application";

export interface IDeleteUserUseCase {
    execute(dto: DeleteUserDTO): Promise<void>;
}