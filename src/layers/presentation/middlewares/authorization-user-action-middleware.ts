import { ForbiddenError, IGetUserSubscriptionUseCase, UnauthorizedError } from "@/layers/application";
import { HttpRequest, HttpResponse, HttpHelper, AbstractMiddleware } from "@/layers/presentation";

export class AuthorizationUserActionMiddleware extends AbstractMiddleware {

	constructor(
        private readonly getUserSubscriptionUseCase: IGetUserSubscriptionUseCase,
        private readonly action: string,
        private readonly mustCheckNumberOfActionsTaken: boolean,
        private readonly getNumberOfActionsDone?: (userId: string) => Promise<number>
    ) { 
		super();

        if(this.mustCheckNumberOfActionsTaken && !this.getNumberOfActionsDone) 
            throw new Error("É necessário fornecer uma função de retorno das ações feitas");
	}

	async handler(request: HttpRequest): Promise<HttpResponse> {
        if(!request.userId) throw new UnauthorizedError("Você não está autenticado");

        const subscription = await this.getUserSubscriptionUseCase.execute({ userId: request.userId });

        const actionRequired = subscription.plan.actions.find(x => x.name === this.action);

        if(!actionRequired) throw new ForbiddenError("Você não contém o plano necessário para executar a ação");

        if(this.mustCheckNumberOfActionsTaken) {
            const numberOfActionsDone = await this.getNumberOfActionsDone(request.userId);
            if(numberOfActionsDone >= actionRequired.totalOperations) 
                throw new ForbiddenError("Você já fez o número total dessa ação para esse plano");
        }
 
        return HttpHelper.noBody();
	}
}