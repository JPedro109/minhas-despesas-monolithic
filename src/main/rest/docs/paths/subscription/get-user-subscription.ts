import {
    badRequestError,
    notFoundError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { subscriptionModel } from "@/main/rest/docs/models";

export const getUserSubscription = {
    tags: ["Subscription"],
    summary: "Faz o retorno da assinatura do usuário",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno da assinatura do usuário",
            schema: subscriptionModel,
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
