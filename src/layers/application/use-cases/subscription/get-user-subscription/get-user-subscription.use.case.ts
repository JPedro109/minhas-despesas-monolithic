import {
    GetUserSubscriptionDTO,
    GetUserSubscriptionResponseDTO,
    IGetUserSubscriptionUseCase,
    IPayment,
    IUnitOfWorkRepository,
    NotFoundError,
} from "@/layers/application";

export class GetUserSubscriptionUseCase implements IGetUserSubscriptionUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({
        userId,
    }: GetUserSubscriptionDTO): Promise<GetUserSubscriptionResponseDTO> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const subscriptionRepository =
            this.unitOfWorkRepository.getSubscriptionRepository();

        const userExists = await userRepository.getUserById(userId);
        if (!userExists) throw new NotFoundError("O usuário não existe");

        const subscription =
            await subscriptionRepository.getSubscriptionByUserId(userId);

        if (!subscription)
            throw new NotFoundError("O usuário não tem uma assinatura");

        const subscriptionData =
            await this.payment.getSubscriptionBySubscriptionExternalId(
                subscription.subscriptionExternalId,
            );

        return {
            subscriptionId: subscription.id,
            userId: subscription.userId,
            active: subscriptionData.active,
            renewable: subscriptionData.renewable,
            startDate: subscriptionData.startDate,
            endDate: subscriptionData.endDate,
            plan: {
                planId: subscription.plan.id,
                name: subscription.plan.name,
                amount: subscription.plan.amount,
                description: subscription.plan.description,
                durationInDays: subscription.plan.durationInDays,
                actions: subscription.plan.actions.map((action) => ({
                    actionId: action.id,
                    name: action.name,
                    description: action.description,
                })),
            },
        };
    }
}
