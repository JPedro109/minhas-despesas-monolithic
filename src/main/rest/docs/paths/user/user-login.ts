import {
    badRequestError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";

export const userLogin = {
    tags: ["User"],
    summary: "Faz o login do usuário",
    parameters: [
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },

                    password: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        200: {
            description: "Sucesso na autenticação do usuário",
            schema: {
                type: "object",
                properties: {
                    accessToken: {
                        type: "string",
                    },
                    refreshToken: {
                        type: "string",
                    },
                },
            },
        },

        400: badRequestError,

        401: unauthorizedError,

        500: internalServerError,
    },
};
