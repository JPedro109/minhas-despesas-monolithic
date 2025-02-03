import {
    badRequestError,
    internalServerError,
    unprocessableEntityError,
} from "@/main/rest/docs/components";

export const recoverUserPassword = {
    tags: ["User"],
    summary: "Faz a recuperação da senha do usuário",
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
            description: "Sucesso na recuperação da senha",
        },

        400: badRequestError,

        422: unprocessableEntityError,

        500: internalServerError,
    },
};
