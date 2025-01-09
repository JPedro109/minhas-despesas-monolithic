import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUsername = {
    tags: ["User"],
    summary: "Faz a atualização do nome do usuário",
    parameters: [
        authorizationHeaderSchema,

        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na atualização do nome",
        },

        400: badRequestError,

        404: badRequestError,

        401: unauthorizedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
