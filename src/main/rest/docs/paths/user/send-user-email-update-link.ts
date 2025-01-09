import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    notFoundError,
    conflictedError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const sendUserEmailUpdateLink = {
    tags: ["User"],
    summary: "Faz o envio do link de confirmação de atualização de email",
    parameters: [
        authorizationHeaderSchema,

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
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso no envio do link",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        409: conflictedError,

        500: internalServerError,
    },
};
