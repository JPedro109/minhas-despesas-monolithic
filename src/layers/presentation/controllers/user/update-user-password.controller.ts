import { IUpdateUserPasswordUseCase, ILog } from "@/layers/application";
import {
    AbstractController,
    HttpRequest,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class UpdateUserPasswordController extends AbstractController {
    constructor(
        private readonly useCase: IUpdateUserPasswordUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "UpdateUserPassword", {
            id: {
                type: "string",
                optional: false,
            },
            password: {
                type: "string",
                optional: false,
            },
            newPassword: {
                type: "string",
                optional: false,
            },
            newPasswordConfirm: {
                type: "string",
                optional: false,
            },
        });
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const { password, newPassword, newPasswordConfirm } = request.data;

        const body = {
            id: request.userId,
            password,
            newPassword,
            newPasswordConfirm,
        };

        this.validateRequestSchema(body);

        await this.useCase.execute(body);

        return HttpHelper.noBody();
    }
}
