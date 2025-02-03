import { NotifyUserOfSubscriptionPaymentFailureDTO } from "@/layers/application";

export interface INotifyUserOfSubscriptionPaymentFailureUseCase {
    execute(dto: NotifyUserOfSubscriptionPaymentFailureDTO): Promise<void>;
}
