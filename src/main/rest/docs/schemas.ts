export const errorSchema = {
    type: "object",
    properties: {
        message: {
            type: "string",
        },
        code: {
            type: "string",
        },
    },
};

export const authorizationHeaderSchema = {
    in: "header",
    name: "Authorization",
    required: true,
    description: "Autenticação do Usuário",
    example: "Bearer token",
};

export const basicAuthorizationHeaderSchema = {
    in: "header",
    name: "Authorization",
    required: true,
    description: "Código de Autenticação",
    example: "Basic token",
};
