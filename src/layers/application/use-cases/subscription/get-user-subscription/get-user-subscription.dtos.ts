export type GetUserSubscriptionDTO = {
    userId: string;
};

export type GetUserSubscriptionResponseDTO = {
    subscriptionId: string;
    userId: string;
    plan: {
        planId: string;
        name: string;
        amount: number;
        description: string;
        durationInDays: number;
        actions: {
            actionId: string;
            name: string;
            description: string;
        }[];
    };
    active: boolean;
    renewable: boolean;
    startDate: Date;
    endDate?: Date;
};
