import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateUserEmail = {
    tags: ["User"],
    summary: "Faz a confirmação da atualização do e-mail",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    code: {
                        type: "string",
                    },
                    email: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na confirmação da atualização do e-mail",
        },

        400: badRequestError,

        401: unauthorizedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
