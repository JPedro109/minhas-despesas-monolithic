import {
    badRequestError,
    unauthorizedError,
    internalServerError,
    forbiddenError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateSubscription = {
    tags: ["Subscription"],
    summary: "Faz a atualização da assinatura do usuário",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "path",
            name: "newPlanId",
            required: true,
        },
    ],
    responses: {
        204: {
            description: "Sucesso na atualização da assinatura do usuário",
        },

        400: badRequestError,

        401: unauthorizedError,

        403: forbiddenError,

        500: internalServerError,
    },
};
