import { CreateExtractDTO } from "@/layers/application";

export interface ICreateExtractUseCase {
    execute(dto: CreateExtractDTO): Promise<string>;
}
