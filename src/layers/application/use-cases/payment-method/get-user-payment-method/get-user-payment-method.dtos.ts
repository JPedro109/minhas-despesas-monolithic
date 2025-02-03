export type GetUserPaymentMethodDTO = {
    userId: string;
};

export type GetUserPaymentMethodResponseDTO = {
    paymentMethodId: string;
    userId: string;
    name: string;
    token: string;
};
