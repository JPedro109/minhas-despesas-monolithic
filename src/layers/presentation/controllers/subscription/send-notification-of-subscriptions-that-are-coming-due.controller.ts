import {
    ISendNotificationOfExpensesThatAreComingDueUseCase,
    ILog,
} from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class SendNotificationOfSubscriptionThatAreComingDueController extends AbstractController {
    constructor(
        private readonly useCase: ISendNotificationOfExpensesThatAreComingDueUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "SendNotificationOfExpensesThatAreComingDue");
    }

    protected async handler(): Promise<HttpResponse> {
        await this.useCase.execute();

        return HttpHelper.noBody();
    }
}
