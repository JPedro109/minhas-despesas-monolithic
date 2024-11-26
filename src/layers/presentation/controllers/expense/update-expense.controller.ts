import { IUpdateExpenseUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class UpdateExpenseController extends AbstractController {

    constructor(
        private readonly useCase: IUpdateExpenseUseCase,
        protected readonly log: ILog
    ) {
        super(
            log,
            "UpdateExpense",
            {
                userId: {
                    type: "string",
                    optional: false
                },
                id: {
                    type: "string",
                    optional: false
                },
                expenseName: {
                    type: "string",
                    optional: false
                },
                expenseValue: {
                    type: "number",
                    optional: false
                },
                dueDate: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const {
            id,
            expenseName,
            expenseValue,
            dueDate
        } = request.data;
        const body = {
            id,
            userId: request.userId,
            expenseName,
            expenseValue,
            dueDate
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}