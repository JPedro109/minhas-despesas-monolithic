import { UpdateUserPasswordDTO } from "@/layers/application";

export interface IUpdateUserPasswordUseCase {
    execute(dto: UpdateUserPasswordDTO): Promise<string>;
}