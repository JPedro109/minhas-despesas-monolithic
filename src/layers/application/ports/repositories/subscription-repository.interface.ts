import { SubscriptionEntity } from "@/layers/domain";

export interface ISubscriptionRepository {
    setContext(context: unknown): void;
    createSubscription(
        subscription: SubscriptionEntity,
    ): Promise<SubscriptionEntity>;
    getSubscriptionByUserId(userId: string): Promise<SubscriptionEntity | null>;
}
