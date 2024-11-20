import { IUpdateUserEmailUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class UpdateUserEmailController extends AbstractController {

    constructor(
        private readonly useCase: IUpdateUserEmailUseCase,
        log: ILog
    ) { 
        super(
            log,
            {
                email: {
                    type: "string",
                    optional: false
                }
            },
            "UpdateUserEmail"
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { code, email } = request.data;

        const body = {
            code, 
            email 
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}