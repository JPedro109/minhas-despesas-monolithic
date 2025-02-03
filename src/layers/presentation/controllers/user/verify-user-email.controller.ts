import { IVerifyUserEmailUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class VerifyUserEmailController extends AbstractController {
    constructor(
        private readonly useCase: IVerifyUserEmailUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "VerifyUserEmail", {
            code: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { code } = request.body;
        const body = { code };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
