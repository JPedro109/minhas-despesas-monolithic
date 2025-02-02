import {
    badRequestError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";

export const verifyUserEmail = {
    tags: ["User"],
    summary: "Faz a confirmação de que e-mail do usuário existe",
    parameters: [
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    code: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso na confirmação do e-mail",
        },

        400: badRequestError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
