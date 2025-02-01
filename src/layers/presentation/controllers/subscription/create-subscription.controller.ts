import { ICreateSubscriptionUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class CreateSubscriptionController extends AbstractController {
    constructor(
        private readonly useCase: ICreateSubscriptionUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "CreateSubscription", {
            userId: {
                type: "string",
                optional: false,
            },
            planId: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { planId } = request.data;

        const body = {
            userId: request.userId,
            planId,
        };

        this.validateRequestSchema(body);

        const result = await this.useCase.execute(body);

        return HttpHelper.created(result);
    }
}
