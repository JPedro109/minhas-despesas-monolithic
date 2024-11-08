import {
	IUnitOfWorkRepository,
	UpdatePaymentMethodTokenDTO,
	IUpdatePaymentMethodTokenUseCase,
	NotFoundError
} from "@/layers/application";

export class UpdatePaymentMethodTokenUseCase implements IUpdatePaymentMethodTokenUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ id, token }: UpdatePaymentMethodTokenDTO): Promise<string> {
		const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

		const paymentMethod = await paymentMethodRepository.getPaymentMethodById(id);
		if(!paymentMethod) throw new NotFoundError("Esse método de pagamento não existe");

		paymentMethod.token = token;
		await paymentMethodRepository.updatePaymentMethodById(paymentMethod.id, paymentMethod); 

		return paymentMethod.token;
	}
}