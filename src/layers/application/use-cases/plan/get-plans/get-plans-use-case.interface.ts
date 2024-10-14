import { GetPlansResponseDTO } from "@/layers/application";

export interface IGetPlansUseCase {
    execute(): Promise<GetPlansResponseDTO[]>;
}