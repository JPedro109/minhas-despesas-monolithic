import { PlanNameEnum, SubscriptionEntity } from "@/layers/domain";
import {
    ForbiddenError,
    IManageSubscriptionRenewalUseCase,
    IPlanRepository,
    IUnitOfWorkRepository,
    ManageSubscriptionRenewalDTO,
} from "@/layers/application";

export class ManageSubscriptionRenewalUseCase
    implements IManageSubscriptionRenewalUseCase
{
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) {}

    async execute({
        userId,
        renew,
    }: ManageSubscriptionRenewalDTO): Promise<void> {
        const subscriptionRepository =
            this.unitOfWorkRepository.getSubscriptionRepository();
        const planRepository = this.unitOfWorkRepository.getPlanRepository();

        const subscriptionActive =
            await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        if (subscriptionActive.plan.name === PlanNameEnum.Free)
            throw new ForbiddenError(
                `Não é possível gerenciar uma assinatura com o plano ${PlanNameEnum.Free}`,
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

        const newSubscription = renew
            ? this.createRenewedSubscription(subscriptionActive, startOfToday)
            : await this.handleNonRenewal(
                  subscriptionActive,
                  startOfToday,
                  planRepository,
              );

        if (newSubscription) {
            await this.unitOfWorkRepository.transaction(async () => {
                subscriptionActive.active = false;
                await subscriptionRepository.updateSubscriptionById(
                    subscriptionActive.id,
                    subscriptionActive,
                );

                await subscriptionRepository.createSubscription(
                    newSubscription,
                );
            });
        }
    }

    private createRenewedSubscription(
        subscriptionActive: SubscriptionEntity,
        startOfToday: Date,
    ): SubscriptionEntity {
        return new SubscriptionEntity({
            userId: subscriptionActive.userId,
            plan: subscriptionActive.plan,
            active: true,
            renewable: true,
            amount: subscriptionActive.plan.amount,
            startDate: startOfToday,
            endDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate() +
                    subscriptionActive.plan.durationInDays,
                0,
                0,
                0,
            ),
        });
    }

    private async handleNonRenewal(
        subscriptionActive: SubscriptionEntity,
        startOfToday: Date,
        planRepository: IPlanRepository,
    ): Promise<SubscriptionEntity | null> {
        const daysLateInPayment =
            (startOfToday.getTime() - subscriptionActive.endDate.getTime()) /
            1000 /
            60 /
            60 /
            24;

        if (daysLateInPayment <= 7 && subscriptionActive.renewable) return null;

        const planFree = await planRepository.getPlanByName(PlanNameEnum.Free);

        return new SubscriptionEntity({
            userId: subscriptionActive.userId,
            plan: planFree,
            active: true,
            renewable: false,
            amount: planFree.amount,
            startDate: startOfToday,
        });
    }
}
