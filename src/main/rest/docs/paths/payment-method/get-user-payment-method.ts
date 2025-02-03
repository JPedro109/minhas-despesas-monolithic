import {
    badRequestError,
    notFoundError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { paymentMethodModel } from "@/main/rest/docs/models";

export const getUserPaymentMethod = {
    tags: ["Payment Method"],
    summary: "Faz o retorno do método de pagamento do usuário",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno do método de pagamento do usuário",
            schema: paymentMethodModel,
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
