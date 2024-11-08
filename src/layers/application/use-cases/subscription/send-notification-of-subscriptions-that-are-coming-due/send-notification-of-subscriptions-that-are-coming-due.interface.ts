export interface ISendNotificationOfSubscriptionThatAreComingDue {
    execute(): Promise<void>;
}