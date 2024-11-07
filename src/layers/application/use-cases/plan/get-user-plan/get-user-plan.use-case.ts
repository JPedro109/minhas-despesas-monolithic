import {
	IUnitOfWorkRepository,
	GetUserPlanDTO,
	GetUserPlanResponseDTO,
	IGetUserPlanUseCase,
	NotFoundError
} from "@/layers/application";

export class GetUserPlanUseCase implements IGetUserPlanUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ userId }: GetUserPlanDTO): Promise<GetUserPlanResponseDTO> {
		const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();

		const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);
		if(!subscriptionActive) throw new NotFoundError("O usuário não existe ou não tem nenhuma assinatura ativa");

		return {
			planId: subscriptionActive.plan.id,
			planAmount: subscriptionActive.plan.amount,
			planDescription: subscriptionActive.plan.description,
			planName: subscriptionActive.plan.name
		};
	}
}