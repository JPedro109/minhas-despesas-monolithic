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
            in: "query",
            name: "code",
            required: true,
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
