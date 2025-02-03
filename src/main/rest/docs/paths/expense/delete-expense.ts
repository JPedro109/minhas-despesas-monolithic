import {
    badRequestError,
    internalServerError,
    notFoundError,
    unauthorizedError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deleteExpense = {
    tags: ["Expense"],
    summary: "Faz a exclusão de uma despesa",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "path",
            name: "id",
            required: true,
        },
        {
            in: "query",
            name: "deleteExpensePaymentHistory",
            required: true,
        },
    ],
    responses: {
        204: {
            description: "Sucesso na exclusão da despesa",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
