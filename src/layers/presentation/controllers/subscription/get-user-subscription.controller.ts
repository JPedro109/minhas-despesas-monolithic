import { IGetUserSubscriptionUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class GetUserSubscriptionController extends AbstractController {

    constructor(
        private readonly useCase: IGetUserSubscriptionUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "GetUserSubscription",
            {
                userId: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const body = { 
            userId: request.userId
        };

        this.validateRequestSchema(body);

        const result = await this.useCase.execute(body);

        return HttpHelper.ok(result);
    }
}