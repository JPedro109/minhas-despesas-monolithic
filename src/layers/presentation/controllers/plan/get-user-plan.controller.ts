import { IGetUserPlanUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class GetUserPlanController extends AbstractController {
    constructor(
        private readonly useCase: IGetUserPlanUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "GetUserPlan", {
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

        const plan = await this.useCase.execute(body);

        return HttpHelper.ok(plan);
    }
}
