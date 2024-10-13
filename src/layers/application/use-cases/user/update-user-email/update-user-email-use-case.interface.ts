import { UpdateUserEmailDTO } from "@/layers/application";

export interface IUpdateUserEmailUseCase {
    execute(dto: UpdateUserEmailDTO): Promise<string>;
}