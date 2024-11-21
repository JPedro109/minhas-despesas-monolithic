import { IVerifyUserEmailUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class VerifyUserEmailController extends AbstractController {

    constructor(
        private readonly useCase: IVerifyUserEmailUseCase,
        log: ILog
    ) { 
        super(
            log,
            {
                code: {
                    type: "string",
                    optional: false
                }
            },
            "VerifyUserEmail"
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { code } = request.data;

        const body = { code };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}