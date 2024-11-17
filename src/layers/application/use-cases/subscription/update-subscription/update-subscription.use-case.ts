import { ExpenseEntity, PlanEntity, PlanNameEnum, SubscriptionEntity } from "@/layers/domain";
import {
    ConflictedError,
    ForbiddenError,
    IPayment,
    IUnitOfWorkRepository,
    IUpdateSubscriptionUseCase,
    PaymentCurrencyEnum,
    UpdateSubscriptionDTO
} from "@/layers/application";

export class UpdateSubscriptionUseCase implements IUpdateSubscriptionUseCase {

    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment
    ) { }

    async execute({ userId, newPlanId }: UpdateSubscriptionDTO): Promise<string> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
        const planRepository = this.unitOfWorkRepository.getPlanRepository();
        const customerRepository = this.unitOfWorkRepository.getCustomerRepository();
        const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();
        const expenseRepository = this.unitOfWorkRepository.getExpenseRepository();

        const subscriptionActive = await subscriptionRepository.getActiveSubscriptionByUserId(userId);

        if(Date.now() >= subscriptionActive.endDate.getTime())
            throw new ForbiddenError("Execute o pagamento para poder mudar de plano");

        if (subscriptionActive.plan.id === newPlanId) throw new ConflictedError("O usuário já está utilizando esse plano");

        const newPlan = await planRepository.getPlanById(newPlanId);

        const today = new Date();
        const startOfToday = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);

        let newSubscription: SubscriptionEntity;
        if (newPlan.amount > subscriptionActive.plan.amount) {
            newSubscription = this.upgradePlan(userId, subscriptionActive, newPlan, startOfToday);
        } else {
            const userExpenses = await expenseRepository.getExpensesByUserId(userId);
            newSubscription = this.downgradePlan(userId, subscriptionActive, userExpenses, newPlan, startOfToday);
        }

        let newSubscriptionCreated: SubscriptionEntity;
        await this.unitOfWorkRepository.transaction(async () => {
            subscriptionActive.active = false;
            await subscriptionRepository.updateSubscriptionById(subscriptionActive.id, subscriptionActive);
            
            newSubscriptionCreated = await subscriptionRepository.createSubscription(newSubscription);

            if (newSubscriptionCreated.amount > 0) {
                const customer = await customerRepository.getCustomerByUserId(userId);
                const paymentMethod = await paymentMethodRepository.getPaymentMethodByUserId(userId);
                if(!paymentMethod) throw new ForbiddenError("Não é possível atualizar o plano sem um método de pagamento");
                await this.payment.pay(
                    customer.customerId,
                    paymentMethod.token,
                    newSubscriptionCreated.amount,
                    PaymentCurrencyEnum.BRL
                );
            }
        });

        return newSubscriptionCreated.id;
    }

    private upgradePlan(
        userId: string,
        subscriptionActive: SubscriptionEntity,
        newPlan: PlanEntity,
        startOfToday: Date
    ): SubscriptionEntity {
        const timeRemainingUntilTheEndOfTheSubscriptionInDays
            = Math.floor((subscriptionActive?.endDate.getTime()  - startOfToday.getTime()) / 1000 / 60 / 60 / 24);

        const totalPaymentToBeUsed
            = timeRemainingUntilTheEndOfTheSubscriptionInDays *
            (subscriptionActive.plan.amount / subscriptionActive.plan.durationInDays);

        const subscriptionValue = newPlan.amount - (totalPaymentToBeUsed || 0);

        return new SubscriptionEntity({
            userId: userId,
            plan: newPlan,
            active: true,
            renewable: true,
            amount: subscriptionValue,
            startDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate(),
                0,
                0,
                0
            ),
            endDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate() + newPlan.durationInDays,
                0,
                0,
                0
            )
        });
    }

    private downgradePlan(
        userId: string,
        subscriptionActive: SubscriptionEntity,
        userExpenses: ExpenseEntity[],
        newPlan: PlanEntity,
        startOfToday: Date
    ): SubscriptionEntity {
        if (newPlan.name === PlanNameEnum.Free)
            throw new ForbiddenError(`Só é possível voltar ao plano ${PlanNameEnum.Free} desativando a renovação da assinatura atual e ao fim dela sua conta retornará ao plano ${PlanNameEnum.Free}`);

        const totalOperations = newPlan.actions.find(x => x.name === "create:expense").totalOperations;
        const totalExpenses = userExpenses.length;
        if (totalExpenses > totalOperations)
            throw new ForbiddenError(`Para atualizar para esse plano você deve apagar ${totalExpenses - totalOperations} despesas, pois no seu plano só pode conter ${totalOperations} despesas`);

        const timeRemainingUntilTheEndOfTheSubscriptionInDays
            = Math.floor((subscriptionActive.endDate.getTime() - startOfToday.getTime()) / 1000 / 60 / 60 / 24);

        const totalPaymentToBeUsed
            = timeRemainingUntilTheEndOfTheSubscriptionInDays *
            (subscriptionActive.plan.amount / subscriptionActive.plan.durationInDays);

        let subscriptionValue: number = 0;
        let planDurationInDays: number = newPlan.durationInDays;
        const value = newPlan.amount - totalPaymentToBeUsed;

        if (value >= 0) {
            subscriptionValue += value;
        } else {
            const percentageOfDaysAdded = (value * -1) / newPlan.amount;
            planDurationInDays += Math.ceil(planDurationInDays * percentageOfDaysAdded);
        }

        return new SubscriptionEntity({
            userId: userId,
            plan: newPlan,
            active: true,
            renewable: true,
            amount: subscriptionValue,
            startDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate(),
                0,
                0,
                0
            ),
            endDate: new Date(
                startOfToday.getUTCFullYear(),
                startOfToday.getUTCMonth(),
                startOfToday.getUTCDate() + planDurationInDays,
                0,
                0,
                0
            )
        });
    }
}