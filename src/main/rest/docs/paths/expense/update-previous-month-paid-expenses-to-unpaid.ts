import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updatePreviousMonthPaidExpensesToUnpaid = {
    tags: ["Expense"],
    summary:
        "Faz a atualização das data de vencimento das despesas para o próximo mês",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description:
                "Sucesso na atualização das data de vencimento das despesas para o próximo mês",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
