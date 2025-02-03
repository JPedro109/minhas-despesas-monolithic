import {
    ForbiddenError,
    IGetUserSubscriptionUseCase,
    ILog,
    UnauthorizedError,
} from "@/layers/application";
import {
    HttpRequest,
    HttpResponse,
    HttpHelper,
    AbstractMiddleware,
} from "@/layers/presentation";

export class AuthorizationUserActionMiddleware extends AbstractMiddleware {
    constructor(
        private readonly getUserSubscriptionUseCase: IGetUserSubscriptionUseCase,
        private readonly action: string,
        protected readonly log: ILog,
    ) {
        super(log, "AuthorizationUserAction");
    }

    async handler(request: HttpRequest): Promise<HttpResponse> {
        if (!request.userId)
            throw new UnauthorizedError("Você não está autenticado");

        const subscription = await this.getUserSubscriptionUseCase.execute({
            userId: request.userId,
        });

        const actionRequired = subscription.plan.actions.find(
            (x) => x.name === this.action,
        );

        if (!actionRequired)
            throw new ForbiddenError(
                "Você não contém o plano necessário para executar a ação",
            );

        return HttpHelper.noBody();
    }
}
