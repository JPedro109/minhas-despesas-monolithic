import { IUserLoginUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class UserLoginController extends AbstractController {

    constructor(
        private readonly useCase: IUserLoginUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "UserLogin",
            {
                email: {
                    type: "string",
                    optional: false
                },
                password: {
                    type: "string",
                    optional: false
                }
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { email, password } = request.data;

        const body = {
            email,
            password
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.ok(response);
    }
}