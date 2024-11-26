import { IManageSubscriptionRenewalUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class ManageSubscriptionRenewalController extends AbstractController {

    constructor(
        private readonly useCase: IManageSubscriptionRenewalUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "ManageSubscriptionRenewal",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                renew: {
                    type: "boolean",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { renew } = request.data;
        
        const body = { 
            userId: request.userId,
            renew
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}