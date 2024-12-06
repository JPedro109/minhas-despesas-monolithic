import "dotenv/config";

type EnvironmentVariables = {
    appUrl: string;
    jwtKey: string;
    basicAuthenticationUser: string;
    basicAuthenticationPassword: string;
}

export const environmentVariables: EnvironmentVariables = {
    appUrl: process.env.APP_URL,
    jwtKey: process.env.JWT_KEY,
    basicAuthenticationUser: process.env.BASIC_AUTHENTICATION_USER,
    basicAuthenticationPassword: process.env.BASIC_AUTHENTICATION_PASSWORD
};