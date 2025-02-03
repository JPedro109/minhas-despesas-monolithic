import {
    badRequestError,
    conflictedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const createExtract = {
    tags: ["Extract"],
    summary: "Faz a criação do extrato",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    referenceYear: {
                        type: "integer",
                    },

                    referenceMonth: {
                        type: "integer",
                    },
                },
            },
        },
    ],
    responses: {
        201: {
            description: "Sucesso na criação",
            schema: {
                type: "string",
            },
        },

        400: badRequestError,

        409: conflictedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
