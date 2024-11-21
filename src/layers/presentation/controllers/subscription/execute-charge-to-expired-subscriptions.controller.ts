import { IExecuteChargeToExpiredSubscriptionsUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper } from "@/layers/presentation";

export class ExecuteChargeToExpiredSubscriptionsController extends AbstractController {

    constructor(
        private readonly useCase: IExecuteChargeToExpiredSubscriptionsUseCase,
        log: ILog
    ) { 
        super(
            log,
            "ExecuteChargeToExpiredSubscriptions"
        );
    }

    protected async handler(): Promise<HttpResponse> {
        await this.useCase.execute();

        return HttpHelper.noBody();
    }
}