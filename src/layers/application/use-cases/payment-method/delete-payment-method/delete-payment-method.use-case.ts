import {
	IUnitOfWorkRepository,
	DeletePaymentMethodDTO,
	IDeletePaymentMethodUseCase,
	NotFoundError,
	IPayment
} from "@/layers/application";

export class DeletePaymentMethodUseCase implements IDeletePaymentMethodUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly payment: IPayment
	) { }

	async execute({ id }: DeletePaymentMethodDTO): Promise<string> {
		const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

		const paymentMethod = await paymentMethodRepository.getPaymentMethodById(id);
		if(!paymentMethod) throw new NotFoundError("Esse método de pagamento não existe");

		await this.unitOfWorkRepository.transaction(async () => {
			const paymentMethod = await paymentMethodRepository.deletePaymentMethodById(id); 
			await this.payment.deletePaymentMethod(paymentMethod.token);
		});

		return paymentMethod.name;
	}
}