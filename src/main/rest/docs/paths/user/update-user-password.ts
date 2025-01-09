import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";

import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUserPassword = {
    tags: ["User"],
    summary: "Faz a atualização da senha do usuário",
    parameters: [
        authorizationHeaderSchema,

        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    password: {
                        type: "string",
                    },

                    newPassword: {
                        type: "string",
                    },

                    newPasswordConfirm: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na atualização da senha do usuário",
        },

        400: badRequestError,

        401: unauthorizedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
