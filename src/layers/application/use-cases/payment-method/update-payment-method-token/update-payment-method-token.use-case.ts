import {
	IUnitOfWorkRepository,
	UpdatePaymentMethodTokenDTO,
	IUpdatePaymentMethodTokenUseCase,
	NotFoundError,
	IPayment
} from "@/layers/application";

export class UpdatePaymentMethodTokenUseCase implements IUpdatePaymentMethodTokenUseCase {

	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly payment: IPayment
	) { }

	async execute({ id, userId, token }: UpdatePaymentMethodTokenDTO): Promise<void> {
		const customerRepository = this.unitOfWorkRepository.getCustomerRepository();
		const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

		const paymentMethod = await paymentMethodRepository.getPaymentMethodById(id);
		if(!paymentMethod) throw new NotFoundError("Esse método de pagamento não existe");

		const customer = await customerRepository.getCustomerByUserId(userId);

		const oldPayment = paymentMethod.token;
		paymentMethod.token = token;
		
		await this.unitOfWorkRepository.transaction(async () => {
			await paymentMethodRepository.updatePaymentMethodById(paymentMethod.id, paymentMethod);
			await this.payment.deletePaymentMethodByToken(oldPayment);
			await this.payment.createPaymentMethod(customer.customerId, token);
		});
	}
}