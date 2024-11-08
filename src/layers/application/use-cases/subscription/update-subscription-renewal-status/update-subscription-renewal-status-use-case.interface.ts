import { UpdateSubscriptionRenewalStatusDTO } from "@/layers/application";

export interface IUpdateSubscriptionRenewalStatusUseCase {
    execute(dto: UpdateSubscriptionRenewalStatusDTO): Promise<string>;
}