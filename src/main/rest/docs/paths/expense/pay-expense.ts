import {
    badRequestError,
    internalServerError,
    notFoundError,
    unauthorizedError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const payExpense = {
    tags: ["Expense"],
    summary: "Faz o pagamento de uma despesa",
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
            description: "Sucesso no pagamento da despesa",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
