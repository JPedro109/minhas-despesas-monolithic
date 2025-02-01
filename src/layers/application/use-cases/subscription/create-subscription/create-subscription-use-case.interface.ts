import { CreateSubscriptionDTO } from "@/layers/application";

export interface ICreateSubscriptionUseCase {
    execute({ userId, planId }: CreateSubscriptionDTO): Promise<string>;
}
