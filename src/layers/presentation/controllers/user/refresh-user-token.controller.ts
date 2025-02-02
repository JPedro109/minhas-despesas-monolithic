import { IRefreshUserTokenUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class RefreshUserTokenController extends AbstractController {
    constructor(
        private readonly useCase: IRefreshUserTokenUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "RefreshUserToken", {
            refreshToken: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { refreshToken } = request.body;
        const body = { refreshToken };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.ok(response);
    }
}
