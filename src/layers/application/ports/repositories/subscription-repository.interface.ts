import { SubscriptionEntity } from "@/layers/domain";

export interface ISubscriptionRepository {
    setContext(context: unknown): void;    
    createSubscription(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
    updateSubscriptionById(subscriptionId: string, subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
    getActiveSubscriptionByUserId(userId: string): Promise<SubscriptionEntity | null>;
    getActiveSubscriptionsByEndDate(endDate: Date, renewable: boolean): Promise<SubscriptionEntity[]>;
}