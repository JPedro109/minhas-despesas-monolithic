import {
    IUnitOfWorkRepository,
    UpdatePaymentMethodTokenDTO,
    IUpdatePaymentMethodTokenUseCase,
    NotFoundError,
    IPayment,
} from "@/layers/application";

export class UpdatePaymentMethodTokenUseCase
    implements IUpdatePaymentMethodTokenUseCase
{
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({
        id,
        userId,
        token,
    }: UpdatePaymentMethodTokenDTO): Promise<void> {
        const customerRepository =
            this.unitOfWorkRepository.getCustomerRepository();
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();

        const paymentMethod =
            await paymentMethodRepository.getPaymentMethodById(id);
        if (!paymentMethod)
            throw new NotFoundError("Esse método de pagamento não existe");

        const customer = await customerRepository.getCustomerByUserId(userId);

        const oldPaymentMethod = paymentMethod.token;

        await this.unitOfWorkRepository.transaction(async () => {
            const tokenCreated =
                await this.payment.attachmentPaymentMethodInCustomer(
                    customer.customerId,
                    token,
                );

            try {
                paymentMethod.token = tokenCreated;
                await paymentMethodRepository.updatePaymentMethodById(
                    paymentMethod.id,
                    paymentMethod,
                );
                await this.payment.detachmentPaymentMethodInCustomerByToken(
                    oldPaymentMethod,
                );
            } catch (e) {
                await this.payment.detachmentPaymentMethodInCustomerByToken(
                    tokenCreated,
                );
                throw e;
            }
        });
    }
}
