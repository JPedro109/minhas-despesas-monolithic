import { PlanEntity, PlanNameEnum, SubscriptionEntity } from "@/layers/domain";
import {
    ConflictedError,
    ForbiddenError,
    IPayment,
    IUnitOfWorkRepository,
    IUpdateSubscriptionUseCase,
    PaymentCurrencyEnum,
    UpdateSubscriptionDTO,
} from "@/layers/application";

export class UpdateSubscriptionUseCase implements IUpdateSubscriptionUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({ userId, newPlanId }: UpdateSubscriptionDTO): Promise<void> {
        const subscriptionRepository =
            this.unitOfWorkRepository.getSubscriptionRepository();
        const planRepository = this.unitOfWorkRepository.getPlanRepository();
        const customerRepository =
            this.unitOfWorkRepository.getCustomerRepository();
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();

        const subscriptionActive =
            await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        const newPlan = await planRepository.getPlanById(newPlanId);

        if (subscriptionActive.plan.id === newPlanId)
            throw new ConflictedError(
                "O usuário já está utilizando esse plano",
            );

        if (newPlan.name === PlanNameEnum.Free)
            throw new ForbiddenError(
                `Só é possível voltar ao plano ${PlanNameEnum.Free} desativando a renovação da assinatura atual e ao fim dela sua conta retornará ao plano ${PlanNameEnum.Free}`,
            );

        const today = new Date();
        const startOfToday = new Date(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate(),
            0,
            0,
            0,
        );

        const newSubscription = this.upgradePlan(userId, newPlan, startOfToday);

        await this.unitOfWorkRepository.transaction(async () => {
            subscriptionActive.active = false;
            await subscriptionRepository.updateSubscriptionById(
                subscriptionActive.id,
                subscriptionActive,
            );

            const newSubscriptionCreated =
                await subscriptionRepository.createSubscription(
                    newSubscription,
                );

            const customer =
                await customerRepository.getCustomerByUserId(userId);
            const paymentMethod =
                await paymentMethodRepository.getPaymentMethodByUserId(userId);
            if (!paymentMethod)
                throw new ForbiddenError(
                    "Não é possível atualizar o plano sem um método de pagamento",
                );
            await this.payment.pay(
                customer.customerId,
                paymentMethod.token,
                newSubscriptionCreated.amount,
                PaymentCurrencyEnum.BRL,
            );
        });
    }

    private upgradePlan(
        userId: string,
        newPlan: PlanEntity,
        startOfToday: Date,
    ): SubscriptionEntity {
        return new SubscriptionEntity({
            userId: userId,
            plan: newPlan,
            active: true,
            renewable: true,
            amount: newPlan.amount,
            startDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate(),
                0,
                0,
                0,
            ),
            endDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate() + newPlan.durationInDays,
                0,
                0,
                0,
            ),
        });
    }
}
