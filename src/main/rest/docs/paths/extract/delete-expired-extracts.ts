import {
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { basicAuthorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deleteExpiredExtracts = {
    tags: ["Extract"],
    summary: "Faz a execução da deleção de extratos expirados",
    parameters: [basicAuthorizationHeaderSchema],
    responses: {
        204: {
            description: "Sucesso da deleção de extratos expirados",
        },

        401: unauthorizedError,

        500: internalServerError,
    },
};
