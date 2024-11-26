import { IUpdatePreviousMonthPaidExpensesToUnpaidUseCase, ILog } from "@/layers/application";
import { AbstractController, HttpResponse, HttpHelper } from "@/layers/presentation";

export class UpdatePreviousMonthPaidExpensesToUnpaidController extends AbstractController {

    constructor(
        private readonly useCase: IUpdatePreviousMonthPaidExpensesToUnpaidUseCase,
        log: ILog
    ) {
        super(
            log,
            "UpdatePreviousMonthPaidExpensesToUnpaid"
        );
    }

    protected async handler(): Promise<HttpResponse> {
        await this.useCase.execute();

        return HttpHelper.noBody();
    }
}