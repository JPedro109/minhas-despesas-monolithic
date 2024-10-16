import {
	IUnitOfWorkRepository,
	UpdatePaymentMethodNameDTO,
	IUpdatePaymentMethodNameUseCase,
	NotFoundError
} from "@/layers/application";

export class UpdatePaymentMethodNameUseCase implements IUpdatePaymentMethodNameUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository
	) { }

	async execute({ id, name }: UpdatePaymentMethodNameDTO): Promise<string> {
		const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

		const paymentMethod = await paymentMethodRepository.getPaymentMethodById(id);
		if(!paymentMethod) throw new NotFoundError("Esse método de pagamento não existe");

		paymentMethod.name = name;
		await paymentMethodRepository.updatePaymentMethodById(paymentMethod.id, paymentMethod); 

		return paymentMethod.name;
	}
}