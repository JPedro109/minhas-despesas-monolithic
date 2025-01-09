import {
    badRequestError,
    notFoundError,
    unauthorizedError,
    internalServerError,
} from "@/main/rest/docs/components";
import { authorizationHeaderSchema } from "@/main/rest/docs/schemas";

export const deleteUser = {
    tags: ["User"],
    summary: "Faz a exclusão do usuário",
    parameters: [
        authorizationHeaderSchema,
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    password: {
                        type: "string",
                    },

                    passwordConfirm: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na exclusão do usuário",
        },

        400: badRequestError,

        401: unauthorizedError,

        404: notFoundError,

        500: internalServerError,
    },
};
