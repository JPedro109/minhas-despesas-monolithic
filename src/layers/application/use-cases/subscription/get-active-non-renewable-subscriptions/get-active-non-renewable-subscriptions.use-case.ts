import { GetActiveNonRenewableSubscriptionsResponseDTO, IGetActiveNonRenewableSubscriptionsUseCase, IUnitOfWorkRepository } from "@/layers/application";

export class GetActiveNonRenewableSubscriptionsUseCase implements IGetActiveNonRenewableSubscriptionsUseCase {
    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute(): Promise<GetActiveNonRenewableSubscriptionsResponseDTO[]> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

        const today = new Date();
        const subscriptionsEndDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);        
        const subscriptionActives = await subscriptionRepository.getActiveSubscriptionsByEndDate(subscriptionsEndDate, false);

        return subscriptionActives.map(x => ({
            subscriptionId: x.id,
            userId: x.userId,
            amount: x.amount,
            active: x.active,
            renewable: x.renewable,
            startDate: x.startDate,
            endDate: x.endDate 
        }));
    }
}