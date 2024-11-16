import { ManageSubscriptionRenewalDTO } from "@/layers/application";

export interface IManageSubscriptionRenewalUseCase {
    execute(dto: ManageSubscriptionRenewalDTO): Promise<void>;
}