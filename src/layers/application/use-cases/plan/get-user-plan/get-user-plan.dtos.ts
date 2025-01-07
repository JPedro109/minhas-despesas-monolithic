export type GetUserPlanDTO = {
    userId: string;
};

export type GetUserPlanResponseDTO = {
    planId: string;
    planName: string;
    planAmount: number;
    planDescription: string;
};
