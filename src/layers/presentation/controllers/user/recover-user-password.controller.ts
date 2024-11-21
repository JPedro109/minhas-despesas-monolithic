import { IRecoverUserPasswordUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class RecoverUserPasswordController extends AbstractController {

    constructor(
        private readonly useCase: IRecoverUserPasswordUseCase,
        log: ILog
    ) { 
        super(
            log,
            "RecoverUserPassword",
            {
                code: {
                    type: "string",
                    optional: false
                },
                password: {
                    type: "string",
                    optional: false
                },
                passwordConfirm: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const {
            code,
            password,
            passwordConfirm
         } = request.data;

        const body = {
            code,
            password,
            passwordConfirm
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}