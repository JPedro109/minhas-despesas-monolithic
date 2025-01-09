import {
    badRequestError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { expenseModel } from "@/main/rest/docs/models";

export const getUserExpenses = {
    tags: ["Expense"],
    summary: "Faz o retorno das despesas do usuário",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno das despesas do usuário",
            schema: {
                type: "array",
                items: expenseModel,
            },
        },

        400: badRequestError,

        401: unauthorizedError,

        500: internalServerError,
    },
};
