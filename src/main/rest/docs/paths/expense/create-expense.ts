import {
    badRequestError,
    conflictedError,
    forbiddenError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const createExpense = {
    tags: ["Expense"],
    summary: "Faz a criação de uma despesa",
    parameters: [
        authorizationHeaderSchema,
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
        201: {
            description: "Sucesso na criação",
            schema: {
                type: "string",
            },
        },

        400: badRequestError,

        403: forbiddenError,

        409: conflictedError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
