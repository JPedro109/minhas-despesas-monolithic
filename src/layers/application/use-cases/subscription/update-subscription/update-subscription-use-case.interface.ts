import { UpdateSubscriptionDTO } from "@/layers/application";

export interface IUpdateSubscriptionUseCase {
    execute(dto: UpdateSubscriptionDTO): Promise<void>;
}
