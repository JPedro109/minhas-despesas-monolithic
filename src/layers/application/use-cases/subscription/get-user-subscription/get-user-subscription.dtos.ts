export type GetUserSubscriptionDTO = {
    userId: string;
}

export type GetUserSubscriptionResponseDTO = {
    userId: string;
    plan: {
        name: string;
        amount: number;
        description: string;
        durationInDays: number;
        actions: {
            id: string;
            name: string;
            description: string;
            totalOperations: number;
        }[];
    };
    amount: number;
    active: boolean;
    renewable: boolean;
    startDate: Date;
    endDate?: Date;
}