import { IExecuteChargeToExpiredSubscriptions, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper } from "@/layers/presentation";

export class ExecuteChargeToExpiredSubscriptionsController extends AbstractController {

    constructor(
        private readonly useCase: IExecuteChargeToExpiredSubscriptions,
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