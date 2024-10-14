import {
	IUnitOfWorkRepository,
	GetPlansResponseDTO,
	IGetPlansUseCase
} from "@/layers/application";

export class GetPlansUseCase implements IGetPlansUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute(): Promise<GetPlansResponseDTO[]> {
		const planRepository = this.unitOfWorkRepository.getPlanRepository();

		const plans = await planRepository.getPlans();

		return plans.map(plan => ({
			planId: plan.id,
			planAmount: plan.amount,
			planDescription: plan.description,
			planName: plan.name
		}));
	}
}