import "dotenv/config";

type EnvironmentVariables = {
    appUrl: string
}

export const environmentVariables: EnvironmentVariables = {
    appUrl: process.env.APP_URL
};