import { DomainError } from "@/layers/domain";
import { ILog, ConflictedError, ForbiddenError, NotFoundError, UnauthorizedError } from "@/layers/application";
import { HttpHelper, HttpRequest, HttpResponse, IHttp, InvalidRequestSchemaError } from "@/layers/presentation";
import { z } from "zod";

type RequestSchema = {
    [field: string]: {
        type: "string" | "number" | "boolean" | RequestSchema,
        optional: boolean
    }
}

export abstract class AbstractController implements IHttp {

    constructor(
        protected readonly log: ILog,
        protected readonly schema: RequestSchema,
        protected readonly event: string
    ) { }

    public async http(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { statusCode, response } = await this.handler(request);

            this.log.info(
                `${request.path} ${request.method} ${statusCode} ${this.event} | Operation completed successfully`
            );

            return { statusCode, response };
        } catch (e) {
            const { statusCode, response } = this.setErrorStatusCode(e);

            if (statusCode !== 500) {
                this.log.warning(`${request.path} ${request.method} ${statusCode} ${this.event} | ${e.message}`);
            } else {
                this.log.error(`${request.path} ${request.method} ${statusCode} ${this.event}`, e);
            }

            return { statusCode, response };
        }
    }

    protected validateRequestSchema(body: object): void {
        (this.mountZodObjet(this.schema, {}) as z.AnyZodObject).parse(body);
    }

    protected abstract handler(request: HttpRequest): Promise<HttpResponse>;

    private mountZodObjet(schema: RequestSchema, zodObject: object): object {
        const typesDict = {
            string: z.string().min(1),
            number: z.number(),
            boolean: z.boolean()
        };

        for (const field in schema) {
            const props = schema[field];

            if (props.type != "string" && props.type != "number" && props.type != "boolean") {
                zodObject[field] =
                    props.optional ?
                        (this.mountZodObjet(props.type as unknown as RequestSchema, {}) as z.ZodAny).optional() :
                        this.mountZodObjet(props.type as unknown as RequestSchema, {});
            } else {
                zodObject[field] = props.optional ? typesDict[props.type].optional() : typesDict[props.type];
            }
        }

        return z.object(zodObject as z.ZodRawShape);
    };

    private setErrorStatusCode(e: Error): HttpResponse {
        if (e instanceof DomainError) return HttpHelper.unprocessableEntity(e);
        if (e instanceof UnauthorizedError) return HttpHelper.unauthorized(e);
        if (e instanceof NotFoundError) return HttpHelper.notFound(e);
        if (e instanceof ForbiddenError) return HttpHelper.forbidden(e);
        if (e instanceof ConflictedError) return HttpHelper.conflicted(e);
        if (e instanceof z.ZodError) return HttpHelper.badRequest(new InvalidRequestSchemaError(e.message));
        return HttpHelper.serverError();
    }
}