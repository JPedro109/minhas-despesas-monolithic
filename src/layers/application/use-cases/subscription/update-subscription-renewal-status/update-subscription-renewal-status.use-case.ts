import { 
    UpdateSubscriptionRenewalStatusDTO, 
    IUpdateSubscriptionRenewalStatusUseCase, 
    IUnitOfWorkRepository, 
    NotFoundError 
} from "@/layers/application";

export class UpdateSubscriptionRenewalStatusUseCase implements IUpdateSubscriptionRenewalStatusUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId, renewable }: UpdateSubscriptionRenewalStatusDTO): Promise<string> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

        const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        if(!subscriptionActive) throw new NotFoundError("Esse usuário não existe");

        subscriptionActive.renewable = renewable;
        await subscriptionRepository.updateSubscriptionById(subscriptionActive.id, subscriptionActive);

        return subscriptionActive.id;
    }
}