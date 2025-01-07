import { IDeletePaymentMethodUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class DeletePaymentMethodController extends AbstractController {
    constructor(
        private readonly useCase: IDeletePaymentMethodUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "DeletePaymentMethod", {
            id: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.data;
        const body = {
            id,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
