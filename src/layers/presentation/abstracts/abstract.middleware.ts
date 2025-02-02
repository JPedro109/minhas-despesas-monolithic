import { ForbiddenError, ILog, UnauthorizedError } from "@/layers/application";
import {
    HttpHelper,
    HttpRequest,
    HttpResponse,
    IHttp,
} from "@/layers/presentation";

export abstract class AbstractMiddleware implements IHttp {
    constructor(
        protected readonly log: ILog,
        protected readonly event: string,
    ) {}

    public async http(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { statusCode, response } = await this.handler(request);

            return { statusCode, response };
        } catch (e) {
            const { statusCode, response } = this.setErrorStatusCode(e);

            if (statusCode !== 500) {
                this.log.warning(
                    `${request.path} ${request.method} ${statusCode} ${this.event} | ${e.message}`,
                );
            } else {
                this.log.error(
                    `${request.path} ${request.method} ${statusCode} ${this.event}`,
                    e,
                );
            }

            return { statusCode, response };
        }
    }

    protected abstract handler(request: HttpRequest): Promise<HttpResponse>;

    private setErrorStatusCode(e: Error): HttpResponse {
        if (e instanceof UnauthorizedError) return HttpHelper.unauthorized(e);
        if (e instanceof ForbiddenError) return HttpHelper.forbidden(e);
        return HttpHelper.serverError();
    }
}
