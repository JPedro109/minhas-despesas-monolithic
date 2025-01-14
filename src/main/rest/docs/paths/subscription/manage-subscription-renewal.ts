import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    notFoundError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const manageSubscriptionRenewal = {
    tags: ["Subscription"],
    summary: "Faz o gerenciamento da assinatura do usuário",
    parameters: [
        basicAuthorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    renew: {
                        type: "boolean",
                    },
                    userId: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso no gerenciamento da assinatura do usuário",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
