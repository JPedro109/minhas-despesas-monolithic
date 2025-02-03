import { IDeleteExpenseUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class DeleteExpenseController extends AbstractController {
    constructor(
        private readonly useCase: IDeleteExpenseUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "DeleteExpense", {
            id: {
                type: "string",
                optional: false,
            },
            deleteExpensePaymentHistory: {
                type: "boolean",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.params;
        const { deleteExpensePaymentHistory } = request.query;
        const body = {
            id,
            deleteExpensePaymentHistory:
                deleteExpensePaymentHistory === "true" ? true : false,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
