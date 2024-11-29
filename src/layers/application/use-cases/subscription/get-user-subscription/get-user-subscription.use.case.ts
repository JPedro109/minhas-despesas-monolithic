import { 
    GetUserSubscriptionDTO, 
    GetUserSubscriptionResponseDTO, 
    IGetUserSubscriptionUseCase, 
    IUnitOfWorkRepository, 
    NotFoundError 
} from "@/layers/application";

export class GetUserSubscriptionUseCase implements IGetUserSubscriptionUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId }: GetUserSubscriptionDTO): Promise<GetUserSubscriptionResponseDTO> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

        const userExists = await userRepository.getUserById(userId);
        if (!userExists) throw new NotFoundError("O usuário não existe");

        const subscription = await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        return {
            subscriptionId: subscription.id,
            userId: subscription.userId,
            amount: subscription.amount,
            active: subscription.active,
            renewable: subscription.renewable,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            plan: {
                planId: subscription.plan.id,
                name: subscription.plan.name,
                amount: subscription.plan.amount,
                description: subscription.plan.description,
                durationInDays: subscription.plan.durationInDays,
                actions: subscription.plan.actions.map(action => ({
                    actionId: action.id,
                    name: action.name,
                    description: action.description
                }))
            }
        };
    }
}