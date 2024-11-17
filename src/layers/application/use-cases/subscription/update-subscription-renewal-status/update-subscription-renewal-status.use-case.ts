import { PlanNameEnum } from "@/layers/domain";
import { 
    UpdateSubscriptionRenewalStatusDTO, 
    IUpdateSubscriptionRenewalStatusUseCase, 
    IUnitOfWorkRepository, 
    NotFoundError, 
    ForbiddenError
} from "@/layers/application";

export class UpdateSubscriptionRenewalStatusUseCase implements IUpdateSubscriptionRenewalStatusUseCase {

    constructor(private readonly unitOfWorkRepository: IUnitOfWorkRepository) { }

    async execute({ userId, renewable }: UpdateSubscriptionRenewalStatusDTO): Promise<string> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
        const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

        const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        if(!subscriptionActive) throw new NotFoundError("Esse usuário não existe");

        if(subscriptionActive.plan.name === PlanNameEnum.Free) 
            throw new ForbiddenError(`Não é possível alterar o status de renovação de uma assinatura com o plano ${PlanNameEnum.Free}`);

        if(renewable) {
            const paymentMethodExists = await paymentMethodRepository.getPaymentMethodByUserId(userId);
            if(!paymentMethodExists)    
                throw new ForbiddenError("Para ativar a renovação da assinatura é necessário adicionar um método de pagamento");
        }

        subscriptionActive.renewable = renewable;
        await subscriptionRepository.updateSubscriptionById(subscriptionActive.id, subscriptionActive);

        return subscriptionActive.id;
    }
}