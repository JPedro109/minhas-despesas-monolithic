export type GetUserPaymentMethodDTO = {
    userId: string;
};

export type GetUserPaymentMethodResponseDTO = {
    userId: string;
    name: string;
    token: string;
};
