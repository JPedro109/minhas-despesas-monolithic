import {
    badRequestError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";

export const refreshUserToken = {
    tags: ["User"],
    summary: "Faz a geração do access token",
    parameters: [
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    refreshToken: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        200: {
            description: "Sucesso na criação do access token",
            schema: {
                type: "string",
            },
        },

        400: badRequestError,

        401: unauthorizedError,

        500: internalServerError,
    },
};
