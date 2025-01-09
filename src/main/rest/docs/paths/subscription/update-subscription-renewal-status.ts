import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    notFoundError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateSubscriptionRenewalStatus = {
    tags: ["Subscription"],
    summary: "Faz o gerenciamento do estado da assinatura do usuário",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    renewable: {
                        type: "boolean",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description:
                "Sucesso no gerenciamento do estado da assinatura do usuário",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
