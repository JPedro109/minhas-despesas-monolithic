import {
    badRequestError,
    internalServerError,
    notFoundError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deletePaymentMethod = {
    tags: ["Payment Method"],
    summary: "Faz a deleção do método de pagamento",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "path",
            name: "id",
            required: true,
        },
    ],
    responses: {
        204: {
            description: "Sucesso na deleção",
        },

        400: badRequestError,

        404: notFoundError,

        500: internalServerError,
    },
};
