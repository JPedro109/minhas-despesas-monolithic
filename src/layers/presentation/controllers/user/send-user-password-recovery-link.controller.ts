import {
    ISendUserPasswordRecoveryCodeUseCase,
    ILog,
} from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class SendUserPasswordRecoveryCodeController extends AbstractController {
    constructor(
        private readonly useCase: ISendUserPasswordRecoveryCodeUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "SendUserPasswordRecoveryCode", {
            email: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { email } = request.body;
        const body = { email };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
