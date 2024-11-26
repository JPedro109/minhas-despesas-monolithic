import { ISendUserEmailUpdateLinkUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class SendUserEmailUpdateLinkController extends AbstractController {

    constructor(
        private readonly useCase: ISendUserEmailUpdateLinkUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "SendUserEmailUpdateLink",
            {
                id: {
                    type: "string",
                    optional: false
                },
                email: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { email } = request.data;

        const body = { 
            id: request.userId, 
            email 
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}