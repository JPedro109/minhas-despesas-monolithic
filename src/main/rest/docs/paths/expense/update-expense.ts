import {
    badRequestError,
    conflictedError,
    forbiddenError,
    internalServerError,
    notFoundError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const updateExpense = {
    tags: ["Expense"],
    summary: "Faz a atualização de uma despesa",
    parameters: [
        authorizationHeaderSchema,

        {
            in: "path",
            name: "id",
            required: true,
        },

        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    expenseName: {
                        type: "string",
                    },

                    expenseValue: {
                        type: "number",
                    },

                    dueDate: {
                        type: "date",
                        example: "2023-05-17",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na atualização da despesa",
        },

        400: badRequestError,

        403: forbiddenError,

        404: notFoundError,

        409: conflictedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
