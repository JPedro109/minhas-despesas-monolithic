import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const sendNotificationOfSubscriptionsThatAreComingDue = {
    tags: ["Subscription"],
    summary: "Faz o envio da notificação do vencimento de assinatura",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description:
                "Sucesso no envio da notificação do vencimento de assinatura",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
