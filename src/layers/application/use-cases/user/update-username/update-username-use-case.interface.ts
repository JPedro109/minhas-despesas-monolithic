import { UpdateUsernameDTO } from "@/layers/application";

export interface IUpdateUsernameUseCase {
    execute(dto: UpdateUsernameDTO): Promise<string>;
}