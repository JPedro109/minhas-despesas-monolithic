import {
    INotification,
    INotifyUserOfSubscriptionPaymentFailureUseCase,
    IUnitOfWorkRepository,
    EmailTemplateEnum,
    NotFoundError,
    NotifyUserOfSubscriptionPaymentFailureDTO,
} from "@/layers/application";

export class NotifyUserOfSubscriptionPaymentFailureUseCase
    implements INotifyUserOfSubscriptionPaymentFailureUseCase
{
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly notification: INotification,
    ) {}

    async execute({
        customerId,
    }: NotifyUserOfSubscriptionPaymentFailureDTO): Promise<void> {
        const customerRepository =
            this.unitOfWorkRepository.getCustomerRepository();
        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const customer =
            await customerRepository.getCustomerByCustomerId(customerId);

        if (!customer) throw new NotFoundError("O usuário não existe");

        const user = await userRepository.getUserById(customer.userId);

        await this.notification.sendMail(
            user.email,
            EmailTemplateEnum.NotifySubscriptionPaymentFailureTemplate,
            { username: user.username },
        );
    }
}
