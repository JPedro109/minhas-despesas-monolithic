import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updatePaymentMethodToken = {
    tags: ["Payment Method"],
    summary: "Faz a atualização do token do método de pagamento",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "path",
            name: "id",
            required: true,
        },
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description:
                "Sucesso na atualização do token do método de pagamento",
        },

        400: badRequestError,

        401: unauthorizedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
