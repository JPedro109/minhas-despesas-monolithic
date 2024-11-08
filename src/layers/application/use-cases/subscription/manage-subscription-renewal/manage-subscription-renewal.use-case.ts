import { PlanNameEnum, SubscriptionEntity } from "@/layers/domain";
import { 
    IManageSubscriptionRenewalUseCase, 
    IUnitOfWorkRepository, 
    ManageSubscriptionRenewalDTO, 
    NotFoundError 
} from "@/layers/application";

export class ManageSubscriptionRenewalUseCase implements IManageSubscriptionRenewalUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId, renew }: ManageSubscriptionRenewalDTO): Promise<string> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
        const planRepository = this.unitOfWorkRepository.getPlanRepository();

        const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        if(!subscriptionActive) throw new NotFoundError("Esse usuário não existe");

        subscriptionActive.active = false;

        const today = new Date();

        let newSubscription: SubscriptionEntity;
        if(renew) {
            newSubscription = new SubscriptionEntity({
                userId: userId,
                plan: subscriptionActive.plan,
                active: true,
                renewable: false,
                amount: subscriptionActive.plan.amount,
                startDate: new Date(
                    today.getUTCFullYear(), 
                    today.getUTCMonth(), 
                    today.getUTCDate(), 
                    0, 
                    0, 
                    0
                ),
                endDate: new Date(
                    today.getUTCFullYear(), 
                    today.getUTCMonth(), 
                    today.getUTCDate() + subscriptionActive.plan.durationInDays, 
                    0, 
                    0, 
                    0
                )
            });
        } else {
			const planFree = await planRepository.getPlanByName(PlanNameEnum.Free);
            newSubscription = new SubscriptionEntity({
                userId: userId,
                plan: planFree,
                active: true,
                renewable: true,
                amount: planFree.amount,
                startDate: new Date(
                    today.getUTCFullYear(), 
                    today.getUTCMonth(),
                    today.getUTCDate(), 
                    0, 
                    0, 
                    0
                )
            });
        }
        
        let newSubscriptionCreated: SubscriptionEntity;
        await this.unitOfWorkRepository.transaction(async () => {
            await subscriptionRepository.updateSubscriptionById(subscriptionActive.id, subscriptionActive);
            newSubscriptionCreated = await subscriptionRepository.createSubscription(newSubscription);
        });

        return newSubscriptionCreated.id;
    }
}