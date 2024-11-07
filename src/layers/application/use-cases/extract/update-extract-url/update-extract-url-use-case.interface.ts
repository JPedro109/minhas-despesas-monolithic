import { UpdateExtractUrlDTO } from "@/layers/application";

export interface IUpdateExtractUrlUseCase {
    execute(dto: UpdateExtractUrlDTO): Promise<string>;
}