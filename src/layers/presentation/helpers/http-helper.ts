import { InternalServerError } from "../errors";
import { HttpResponse } from "../ports";

export class HttpHelper {
    static ok(data: unknown): HttpResponse {
        return {
            statusCode: 200,
            response: data,
        };
    }

    static created(data: unknown): HttpResponse {
        return {
            statusCode: 201,
            response: data,
        };
    }

    static noBody(): HttpResponse {
        return {
            statusCode: 204,
            response: null,
        };
    }

    static badRequest(error: Error): HttpResponse {
        return {
            statusCode: 400,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static unauthorized(error: Error): HttpResponse {
        return {
            statusCode: 401,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static forbidden(error: Error): HttpResponse {
        return {
            statusCode: 403,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static notFound(error: Error): HttpResponse {
        return {
            statusCode: 404,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static conflicted(error: Error): HttpResponse {
        return {
            statusCode: 409,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static unprocessableEntity(error: Error): HttpResponse {
        return {
            statusCode: 422,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }

    static serverError(error: Error = new InternalServerError()): HttpResponse {
        return {
            statusCode: 500,
            response: {
                message: error.message,
                code: error.name,
            },
        };
    }
}
