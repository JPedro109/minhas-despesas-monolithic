import { GetUserExtractsDTO, GetUserExtractsResponseDTO } from "./get-user-extracts.dtos";

export interface IGetUserExtractsUseCase {
     execute(dto: GetUserExtractsDTO): Promise<GetUserExtractsResponseDTO[]>;
}