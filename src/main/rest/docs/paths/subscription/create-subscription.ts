import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    notFoundError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const createSubscription = {
    tags: ["Subscription"],
    summary: "Faz a criação da assinatura do usuário",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    planId: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        201: {
            description: "Sucesso na criação da assinatura",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
