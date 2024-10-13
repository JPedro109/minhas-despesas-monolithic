import { SubscriptionEntity } from "@/layers/domain";

export interface ISubscriptionRepository {
    setContext(context: unknown): void;    
    createSubscription(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
    getActiveSubscriptionByUserId(userId: string): Promise<SubscriptionEntity>;
    getActiveSubscriptionsByEndDate(endDate: Date): Promise<SubscriptionEntity[]>;
}