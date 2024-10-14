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
		const planRepository = this.unitOfWorkRepository.getPlanRepository();

		const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);
		if(!subscriptionActive) throw new NotFoundError("O usuário não existe ou não tem nenhuma assinatura ativa");

		const planActive = await planRepository.getPlanById(subscriptionActive.planId);

		return {
			planId: planActive.id,
			planAmount: planActive.amount,
			planDescription: planActive.description,
			planName: planActive.name
		};
	}
}