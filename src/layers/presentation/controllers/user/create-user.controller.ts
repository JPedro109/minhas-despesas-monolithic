import { ICreateUserUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpRequest, HttpResponse, HttpHelper } from "@/layers/presentation";

export class CreateUserController extends AbstractController {

    constructor(
        private readonly useCase: ICreateUserUseCase,
        log: ILog
    ) { 
        super(
            log,
            "CreateUser",
            {
                email: {
                    type: "string",
                    optional: false
                },
                username: {
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
                },
                consentVersion: {
                    type: "string",
                    optional: false
                },
                ipAddress: {
                    type: "string",
                    optional: false
                },
                userAgent: {
                    type: "string",
                    optional: false
                },
            }
        );
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const {
            email,
            username,
            password,
            passwordConfirm,
            consentVersion
         } = request.data;

        const body = {
            email,
            username,
            password,
            passwordConfirm,
            consentVersion,
            ipAddress: request.ipAddress,
            userAgent: request.userAgent
        };

        this.validateRequestSchema(body);

        const response = await this.useCase.execute(body);

        return HttpHelper.created(response);
    }
}