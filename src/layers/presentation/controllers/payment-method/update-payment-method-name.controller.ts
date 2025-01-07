import { IUpdatePaymentMethodNameUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class UpdatePaymentMethodNameController extends AbstractController {
    constructor(
        private readonly useCase: IUpdatePaymentMethodNameUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "UpdatePaymentMethodName", {
            id: {
                type: "string",
                optional: false,
            },
            name: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id, name } = request.data;
        const body = {
            id,
            name,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
