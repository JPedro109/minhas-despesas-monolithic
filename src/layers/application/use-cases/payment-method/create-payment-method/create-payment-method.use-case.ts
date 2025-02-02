import {
    IUnitOfWorkRepository,
    CreatePaymentMethodDTO,
    ICreatePaymentMethodUseCase,
    NotFoundError,
    ConflictedError,
    IPayment,
} from "@/layers/application";
import { PaymentMethodEntity } from "@/layers/domain";

export class CreatePaymentMethodUseCase implements ICreatePaymentMethodUseCase {
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment,
    ) {}

    async execute({
        userId,
        name,
        token,
    }: CreatePaymentMethodDTO): Promise<string> {
        const userRepository = this.unitOfWorkRepository.getUserRepository();
        const paymentMethodRepository =
            this.unitOfWorkRepository.getPaymentMethodRepository();
        const customerRepository =
            this.unitOfWorkRepository.getCustomerRepository();

        const userExists = await userRepository.getUserById(userId);
        if (!userExists) throw new NotFoundError("Esse usuário não existe");

        const paymentMethodByNameExists =
            await paymentMethodRepository.getPaymentMethodByUserId(userId);
        if (paymentMethodByNameExists)
            throw new ConflictedError(
                "Já existe um método de pagamento para esse usuário",
            );

        let paymentMethodCreated: PaymentMethodEntity;
        await this.unitOfWorkRepository.transaction(async () => {
            const customer =
                await customerRepository.getCustomerByUserId(userId);
            const tokenCreated =
                await this.payment.attachmentPaymentMethodInCustomer(
                    customer.customerId,
                    token,
                );
            try {
                const paymentMethod = new PaymentMethodEntity({
                    userId,
                    name,
                    token: tokenCreated,
                });
                paymentMethodCreated =
                    await paymentMethodRepository.createPaymentMethod(
                        paymentMethod,
                    );
                await this.payment.payExpiredSubscriptionIfAny(
                    customer.customerId,
                    tokenCreated,
                );
            } catch (e) {
                await this.payment.detachmentPaymentMethodInCustomerByToken(
                    tokenCreated,
                );
                throw e;
            }
        });

        return paymentMethodCreated.id;
    }
}
