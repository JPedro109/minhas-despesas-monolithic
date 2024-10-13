import { UserLoginDTO, UserLoginResponseDTO } from "@/layers/application";

export interface IUserLoginUseCase {
    execute(dto: UserLoginDTO): Promise<UserLoginResponseDTO>;
}