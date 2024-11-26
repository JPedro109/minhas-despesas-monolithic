import { ICreateExpenseUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper, HttpRequest } from "@/layers/presentation";

export class CreateExpenseController extends AbstractController {

    constructor(
        private readonly useCase: ICreateExpenseUseCase,
        protected readonly log: ILog
    ) {
        super(
            log,
            "CreateExpense",
            {
                userId: {
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
            expenseName,
            expenseValue,
            dueDate
        } = request.data;
        const body = {
            userId: request.userId,
            expenseName,
            expenseValue,
            dueDate
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.created(response);
    }
}