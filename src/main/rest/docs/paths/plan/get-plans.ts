import {
    badRequestError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { planModel } from "@/main/rest/docs/models";

export const getPlans = {
    tags: ["Plan"],
    summary: "Faz o retorno dos planos",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno dos planos",
            schema: {
                type: "array",
                items: planModel,
            },
        },

        400: badRequestError,

        401: unauthorizedError,

        500: internalServerError,
    },
};
