import { IGetUserPaymentMethodUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class GetUserPaymentMethodController extends AbstractController {

    constructor(
        private readonly useCase: IGetUserPaymentMethodUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "GetUserPaymentMethod",
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