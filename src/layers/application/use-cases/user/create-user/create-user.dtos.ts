export type CreateUserDTO = {
    email: string;
    username: string;
    password: string;
    passwordConfirm: string;
    consentVersion: string;
    ipAddress: string;
    userAgent: string;
};
