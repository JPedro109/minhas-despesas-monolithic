import {
    UpdateSubscriptionRenewalStatusDTO,
    IUpdateSubscriptionRenewalStatusUseCase,
    IUnitOfWorkRepository,
    NotFoundError,
    ForbiddenError,
    IPayment,
} from "@/layers/application";

export class UpdateSubscriptionRenewalStatusUseCase
    implements IUpdateSubscriptionRenewalStatusUseCase
{
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({
        userId,
        renewable,
    }: UpdateSubscriptionRenewalStatusDTO): Promise<void> {
        const subscriptionRepository =
            this.unitOfWorkRepository.getSubscriptionRepository();
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();

        const subscription =
            await subscriptionRepository.getSubscriptionByUserId(userId);

        if (!subscription) throw new NotFoundError("Esse usuário não existe");

        if (renewable) {
            const paymentMethodExists =
                await paymentMethodRepository.getPaymentMethodByUserId(userId);
            if (!paymentMethodExists)
                throw new ForbiddenError(
                    "Para ativar a renovação da assinatura é necessário adicionar um método de pagamento",
                );
        }

        const subscriptionData =
            await this.payment.getSubscriptionBySubscriptionExternalId(
                subscription.subscriptionExternalId,
            );

        if (subscriptionData.renewable === renewable)
            throw new ForbiddenError(
                `A assinatura já está ${renewable ? "ativa" : "cancelada"}`,
            );

        await this.payment.updateSubscriptionRenewable(
            subscription.subscriptionExternalId,
            renewable,
        );
    }
}
