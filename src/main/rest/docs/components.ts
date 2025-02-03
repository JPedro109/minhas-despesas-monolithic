import { errorSchema } from "./schemas";

export const badRequestError = {
    description: "Erro do Usuário",
    schema: errorSchema,
};

export const conflictedError = {
    description: "Erro de Conflito",
    schema: errorSchema,
};

export const forbiddenError = {
    description: "Erro de Autorização",
    schema: errorSchema,
};

export const unauthorizedError = {
    description: "Erro de Autenticação",
    schema: errorSchema,
};

export const notFoundError = {
    description: "Erro de Dado Não Encontrado",
    schema: errorSchema,
};

export const unprocessableEntityError = {
    description: "Erro de Consistência da Entidade",
    schema: errorSchema,
};

export const internalServerError = {
    description: "Erro no Servidor",
    schema: errorSchema,
};
