import { GetUserSubscriptionDTO, GetUserSubscriptionResponseDTO } from "@/layers/application";

export interface IGetUserSubscriptionUseCase {
    execute(dto: GetUserSubscriptionDTO): Promise<GetUserSubscriptionResponseDTO>;
}