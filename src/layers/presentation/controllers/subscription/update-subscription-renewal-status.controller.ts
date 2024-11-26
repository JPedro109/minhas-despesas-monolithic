import { IUpdateSubscriptionRenewalStatusUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class UpdateSubscriptionRenewalStatusController extends AbstractController {

    constructor(
        private readonly useCase: IUpdateSubscriptionRenewalStatusUseCase,
        log: ILog
    ) { 
        super(
            log,
            "UpdateSubscriptionRenewalStatus",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                renewable: {
                    type: "boolean",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { renewable } = request.data;
        
        const body = { 
            userId: request.userId,
            renewable
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}