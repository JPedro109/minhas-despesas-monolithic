import { IExpenseUndoPaymentUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class ExpenseUndoPaymentController extends AbstractController {
    constructor(
        private readonly useCase: IExpenseUndoPaymentUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "ExpenseUndoPayment", {
            id: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const body = {
            id,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
