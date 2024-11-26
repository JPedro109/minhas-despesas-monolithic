import { IUpdateSubscriptionUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class UpdateSubscriptionController extends AbstractController {

    constructor(
        private readonly useCase: IUpdateSubscriptionUseCase,
        log: ILog
    ) { 
        super(
            log,
            "UpdateSubscription",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                newPlanId: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { newPlanId } = request.data;
        
        const body = { 
            userId: request.userId,
            newPlanId
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}