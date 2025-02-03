import { ISendUserEmailUpdateCodeUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class SendUserEmailUpdateCodeController extends AbstractController {
    constructor(
        private readonly useCase: ISendUserEmailUpdateCodeUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "SendUserEmailUpdateCode", {
            id: {
                type: "string",
                optional: false,
            },
            email: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { email } = request.body;
        const body = {
            id: request.userId,
            email,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
