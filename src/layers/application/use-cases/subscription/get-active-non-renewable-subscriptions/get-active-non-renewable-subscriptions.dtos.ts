export type GetActiveNonRenewableSubscriptionsResponseDTO = {
    subscriptionId: string;
    userId: string;
    amount: number;
    active: boolean;
    renewable: boolean;
    startDate: Date;
    endDate?: Date;
};
