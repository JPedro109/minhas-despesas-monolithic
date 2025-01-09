import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const executeChargeToExpiredSubscriptions = {
    tags: ["Subscription"],
    summary: "Faz a execução dos pagamentos das assinaturas",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description: "Sucesso dos pagamentos das assinaturas",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
