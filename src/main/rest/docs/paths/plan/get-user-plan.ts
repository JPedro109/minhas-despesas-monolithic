import {
    badRequestError,
    notFoundError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { planModel } from "@/main/rest/docs/models";

export const getUserPlan = {
    tags: ["Plan"],
    summary: "Faz o retorno do plano do usuário",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno do plano do usuário",
            schema: planModel,
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
