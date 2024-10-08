import "dotenv/config";

type EnvironmentVariables = {
    appUrl: string
}

export const environmentVariables: EnvironmentVariables = {
    appUrl: process.env.APP_URL
};

((environmentVariables: EnvironmentVariables): void => {
    const nullVariables: string[] = [];

    for (const variable in environmentVariables) {
        const value = environmentVariables[variable];

        if (value === null) nullVariables.push(variable);
    }

    if (nullVariables.length > 0) {
        const messageError = `The environment variables ${nullVariables.join(", ")} are null`;
        throw new Error(messageError);
    }
})(environmentVariables);