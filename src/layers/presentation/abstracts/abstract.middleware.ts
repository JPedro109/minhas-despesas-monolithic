import { ForbiddenError, UnauthorizedError } from "@/layers/application";
import {
    HttpHelper,
    HttpRequest,
    HttpResponse,
    IHttp,
} from "@/layers/presentation";

export abstract class AbstractMiddleware implements IHttp {
    public async http(request: HttpRequest): Promise<HttpResponse> {
        try {
            const { statusCode, response } = await this.handler(request);

            return { statusCode, response };
        } catch (e) {
            return this.setErrorStatusCode(e);
        }
    }

    protected abstract handler(request: HttpRequest): Promise<HttpResponse>;

    private setErrorStatusCode(e: Error): HttpResponse {
        if (e instanceof UnauthorizedError) return HttpHelper.unauthorized(e);
        if (e instanceof ForbiddenError) return HttpHelper.forbidden(e);
        return HttpHelper.serverError();
    }
}
