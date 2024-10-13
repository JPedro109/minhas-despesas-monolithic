import { UserLoginDTO, UserLoginResponseDTO } from "./user-login.dtos";

export interface IUserLoginUseCase {
    execute(dto: UserLoginDTO): Promise<UserLoginResponseDTO>;
}