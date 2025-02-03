export type UserLoginDTO = {
    email: string;
    password: string;
};

export type UserLoginResponseDTO = {
    accessToken: string;
    refreshToken: string;
};
