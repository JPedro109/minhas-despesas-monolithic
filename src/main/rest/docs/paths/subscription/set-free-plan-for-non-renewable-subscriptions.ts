import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const setFreePlanForNonRenewableSubscriptions = {
    tags: ["Subscription"],
    summary:
        "Faz desativação da assinatura atual do usuário e adiciona uma assinatura FREE para a assinatura que está como não renovável",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description:
                "Sucesso na desativação assinatura atual do usuário e adiciona uma assinatura FREE para a assinatura que está como não renovável",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
