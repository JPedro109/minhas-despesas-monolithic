import { IUpdateUsernameUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class UpdateUsernameController extends AbstractController {

    constructor(
        private readonly useCase: IUpdateUsernameUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "UpdateUsername",
            {
                username: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { username } = request.data;

        const body = {
            id: request.userId, 
            username 
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}