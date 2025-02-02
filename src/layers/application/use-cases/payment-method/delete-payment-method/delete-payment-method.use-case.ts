import {
    IUnitOfWorkRepository,
    DeletePaymentMethodDTO,
    IDeletePaymentMethodUseCase,
    NotFoundError,
    IPayment,
    ForbiddenError,
} from "@/layers/application";

export class DeletePaymentMethodUseCase implements IDeletePaymentMethodUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({ id }: DeletePaymentMethodDTO): Promise<void> {
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();
        const subscriptionRepository =
            this.unitOfWorkRepository.getSubscriptionRepository();

        const paymentMethod =
            await paymentMethodRepository.getPaymentMethodById(id);
        if (!paymentMethod)
            throw new NotFoundError("Esse método de pagamento não existe");

        const subscription =
            await subscriptionRepository.getSubscriptionByUserId(
                paymentMethod.userId,
            );

        if (subscription) {
            const subscriptionData =
                await this.payment.getSubscriptionBySubscriptionExternalId(
                    subscription.subscriptionExternalId,
                );

            if (subscriptionData.renewable)
                throw new ForbiddenError(
                    "Não possível excluir o método de pagamento pois existe uma assinatura ativa, cancele a assinatura para excluir o método de pagamento",
                );
        }

        await this.unitOfWorkRepository.transaction(async () => {
            await paymentMethodRepository.deletePaymentMethodById(id);
            await this.payment.detachmentPaymentMethodInCustomerByToken(
                paymentMethod.token,
            );
        });
    }
}
