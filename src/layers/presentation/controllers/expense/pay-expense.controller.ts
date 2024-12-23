import { IPayExpenseUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class PayExpenseController extends AbstractController {

    constructor(
        private readonly useCase: IPayExpenseUseCase,
        protected readonly log: ILog
    ) {
        super(
            log,
            "PayExpense",
            {
                id: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { id } = request.data;
        const body = { id };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}