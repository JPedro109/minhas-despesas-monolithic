import { CreateExtractDTO } from "@/layers/application";

export interface ICreateExcract {
    execute(dto: CreateExtractDTO): Promise<string>;
}