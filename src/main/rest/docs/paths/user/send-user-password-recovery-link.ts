import {
    badRequestError,
    notFoundError,
    internalServerError,
} from "@/main/rest/docs/components";

export const sendUserPasswordRecoverLink = {
    tags: ["User"],
    summary: "Faz o envio do link de recuperação de senha do usuário",
    parameters: [
        {
            in: "body",
            name: "body",
            required: true,
            schema: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                    },
                },
            },
        },
    ],
    responses: {
        204: {
            description: "Sucesso no envio do link",
        },

        400: badRequestError,

        404: notFoundError,

        500: internalServerError,
    },
};
