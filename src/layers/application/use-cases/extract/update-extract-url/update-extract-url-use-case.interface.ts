import { UpdateExtractUrlDTO } from "@/layers/application";

export interface IUpdateExtractUrl {
    execute(dto: UpdateExtractUrlDTO): Promise<string>;
}