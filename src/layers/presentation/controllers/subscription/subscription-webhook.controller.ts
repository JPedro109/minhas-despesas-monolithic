import {
    ILog,
    INotifyUserOfSubscriptionPaymentFailureUseCase,
    IPayment,
} from "@/layers/application";
import {
    AbstractController,
    HttpResponse,
    HttpHelper,
    HttpRequest,
} from "@/layers/presentation";

export class SubscriptionWebhookController extends AbstractController {
    constructor(
        private readonly payment: IPayment,
        private readonly notifyUserOfSubscriptionPaymentFailureUseCase: INotifyUserOfSubscriptionPaymentFailureUseCase,
        protected readonly log: ILog,
    ) {
        super(log, "SubscriptionWebhook");
    }

    protected async handler(request: HttpRequest): Promise<HttpResponse> {
        const payload = this.payment.validateWebhookRequest<{
            type: string;
            data: { object: { customer: string } };
        }>(request.body, request.headers["stripe-signature"]);

        const { type, data } = payload;

        if (type === "invoice.payment_failed") {
            await this.notifyUserOfSubscriptionPaymentFailureUseCase.execute({
                customerId: data.object.customer,
            });
        }

        return HttpHelper.ok({ received: true });
    }
}
