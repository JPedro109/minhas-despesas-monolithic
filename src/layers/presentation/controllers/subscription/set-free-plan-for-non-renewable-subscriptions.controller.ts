import {
    IGetActiveNonRenewableSubscriptionsUseCase,
    IManageSubscriptionRenewalUseCase,
    ILog,
} from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
} from "@/layers/presentation";

export class SetFreePlanForNonRenewableSubscriptionsController extends AbstractController {
    constructor(
        private readonly getActiveNonRenewableSubscriptionsUseCase: IGetActiveNonRenewableSubscriptionsUseCase,
        private readonly manageSubscriptionRenewalUseCase: IManageSubscriptionRenewalUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "SetFreePlanForNonRenewableSubscriptions");
    }

    protected async handler(): Promise<HttpResponse> {
        const subscriptions =
            await this.getActiveNonRenewableSubscriptionsUseCase.execute();

        const promisses = [];
        for (const subscription of subscriptions) {
            promisses.push(
                this.manageSubscriptionRenewalUseCase.execute({
                    userId: subscription.userId,
                    renew: false,
                }),
            );
        }

        const results = await Promise.allSettled(promisses);

        const rejectedPromises = results.filter((x) => x.status === "rejected");

        if (rejectedPromises.length > 0) {
            const errors = rejectedPromises.map((x) => x.reason.message);
            throw new Error(errors.join(", "));
        }

        return HttpHelper.noBody();
    }
}
