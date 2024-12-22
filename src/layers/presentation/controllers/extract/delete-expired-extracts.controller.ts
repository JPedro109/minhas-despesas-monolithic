import { IDeleteExpiredExtractsUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper } from "@/layers/presentation";

export class DeleteExpiredExtractsController extends AbstractController {

    constructor(
        private readonly useCase: IDeleteExpiredExtractsUseCase,
        protected readonly log: ILog
    ) { 
        super(
            log,
            "DeleteExpiredExtracts"
        );
    }

    protected async handler(): Promise<HttpResponse> {
        await this.useCase.execute();

        return HttpHelper.noBody();
    }
}