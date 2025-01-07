import { IGetUserExpensesUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class GetUserExpensesController extends AbstractController {
    constructor(
        private readonly useCase: IGetUserExpensesUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "GetUserExpenses", {
            userId: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const body = {
            userId: request.userId,
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.ok(response);
    }
}
