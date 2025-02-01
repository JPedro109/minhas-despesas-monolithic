import { SubscriptionEntity } from "@/layers/domain";
import {
    IPayment,
    IUnitOfWorkRepository,
    CreateSubscriptionDTO,
    ICreateSubscriptionUseCase,
    NotFoundError,
} from "@/layers/application";

export class CreateSubscriptionUseCase implements ICreateSubscriptionUseCase {
    constructor(
        private readonly unitOfWork: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({ userId, planId }: CreateSubscriptionDTO): Promise<string> {
        const customerRepository = this.unitOfWork.getCustomerRepository();
        const paymentMethodRepository =
            this.unitOfWork.getPaymentMethodRepository();
        const planRepository = this.unitOfWork.getPlanRepository();
        const subscriptionRepository =
            this.unitOfWork.getSubscriptionRepository();

        const customer = await customerRepository.getCustomerByUserId(userId);

        if (!customer) throw new NotFoundError("O customer não existe");

        const paymentMethod =
            await paymentMethodRepository.getPaymentMethodByUserId(userId);
        if (!paymentMethod)
            throw new NotFoundError("O método de pagamento não existe");

        const plan = await planRepository.getPlanById(planId);
        if (!plan) throw new NotFoundError("O plano não existe");

        const subscriptionExternalId = await this.payment.createSubscription(
            customer.customerId,
            plan.planExternalId,
            paymentMethod.token,
        );

        try {
            const subscriptionEntity = new SubscriptionEntity({
                plan,
                subscriptionExternalId,
                userId,
            });
            const subscription =
                await subscriptionRepository.createSubscription(
                    subscriptionEntity,
                );
            return subscription.id;
        } catch (e) {
            await this.payment.deleteSubscription(subscriptionExternalId);
            throw e;
        }
    }
}
