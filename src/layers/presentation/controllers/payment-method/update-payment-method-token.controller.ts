import { IUpdatePaymentMethodTokenUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class UpdatePaymentMethodTokenController extends AbstractController {
    constructor(
        private readonly useCase: IUpdatePaymentMethodTokenUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "UpdatePaymentMethodToken", {
            id: {
                type: "string",
                optional: false,
            },
            userId: {
                type: "string",
                optional: false,
            },
            token: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id, token } = request.data;
        const body = {
            id,
            token,
            userId: request.userId,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
