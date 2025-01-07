import { GetUserPlanDTO, GetUserPlanResponseDTO } from "@/layers/application";

export interface IGetUserPlanUseCase {
    execute(dto: GetUserPlanDTO): Promise<GetUserPlanResponseDTO>;
}
