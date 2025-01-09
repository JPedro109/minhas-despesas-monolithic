import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const sendnotificationOfexpensesThatAreComingDue = {
    tags: ["Expense"],
    summary: "Faz a notificação das despesas que irão vencer",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description: "Sucesso na notificação das despesas que irão vencer",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
