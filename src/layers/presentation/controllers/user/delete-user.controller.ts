import { IDeleteUserUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class DeleteUserController extends AbstractController {
    constructor(
        private readonly useCase: IDeleteUserUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "DeleteUser", {
            id: {
                type: "string",
                optional: false,
            },
            password: {
                type: "string",
                optional: false,
            },
            passwordConfirm: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { password, passwordConfirm } = request.body;
        const body = {
            id: request.userId,
            password,
            passwordConfirm,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
