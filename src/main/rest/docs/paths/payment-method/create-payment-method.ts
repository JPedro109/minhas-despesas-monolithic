import {
    badRequestError,
    conflictedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const createPaymentMethod = {
    tags: ["Payment Method"],
    summary: "Faz a criação do método de pagamento",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                    },

                    token: {
                        type: "string",
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
