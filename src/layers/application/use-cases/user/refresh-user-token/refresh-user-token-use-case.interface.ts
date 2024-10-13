import { RefreshUserTokenDTO } from "@/layers/application";

export interface IRefreshUserTokenUseCase {
    execute(dto: RefreshUserTokenDTO): Promise<string>;
}