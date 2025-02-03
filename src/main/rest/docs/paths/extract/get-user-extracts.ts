import {
    badRequestError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";
import { extractModel } from "@/main/rest/docs/models";

export const getUserExtracts = {
    tags: ["Extract"],
    summary: "Faz o retorno dos extratos do usuário",
    parameters: [authorizationHeaderSchema],
    responses: {
        200: {
            description: "Sucesso no retorno dos extratos do usuário",
            schema: {
                type: "array",
                items: extractModel,
            },
        },

        400: badRequestError,

        401: unauthorizedError,

        500: internalServerError,
    },
};
