import { RefreshUserTokenDTO } from "./refresh-user-token.dtos";

export interface IRefreshUserTokenUseCase {
    execute(dto: RefreshUserTokenDTO): Promise<string>;
}