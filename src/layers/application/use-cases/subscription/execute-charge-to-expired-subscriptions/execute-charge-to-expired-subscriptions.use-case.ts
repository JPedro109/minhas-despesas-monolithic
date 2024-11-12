import { 
    IPayment, 
    IExecuteChargeToExpiredSubscriptions, 
    IUnitOfWorkRepository, 
    PaymentCurrencyEnum
} from "@/layers/application";

export class ExecuteChargeToExpiredSubscriptions implements IExecuteChargeToExpiredSubscriptions {
    
    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly payment: IPayment
    ) { }

    async execute(): Promise<void> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
        const customerRepository = this.unitOfWorkRepository.getCustomerRepository();
        const paymentMethodRepository = this.unitOfWorkRepository.getPaymentMethodRepository();

        const today = new Date();
        const subscriptionsEndDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);        
        const subscriptionActives = await subscriptionRepository.getActiveSubscriptionsByEndDate(subscriptionsEndDate);

        if(subscriptionActives.length === 0) return;

        const subscriptionsMap = new Map<string, { planName: string, value: number }>();
        subscriptionActives.map(x => {
            subscriptionsMap.set(x.userId, { planName: x.plan.name, value: x.amount });
        });

        const userIds = Object.keys(
            Object.fromEntries(subscriptionsMap)
        );

        const paymentMethods = await paymentMethodRepository.getPaymentMethodsByUserIds(userIds);
        const paymentMethodsMap = new Map<string, string>();
        paymentMethods.map(x => paymentMethodsMap.set(x.userId, x.token));

        const customers = await customerRepository.getCustomersByUserIds(userIds);

        const payments = [];
        customers.forEach(customer => {
            const subscription = subscriptionsMap.get(customer.userId);
            const paymentMethod = paymentMethodsMap.get(customer.userId);
            const payment = this.payment.pay(customer.customerId, paymentMethod, subscription.value, PaymentCurrencyEnum.BRL);
            payments.push(payment);
        });

        await Promise.allSettled(payments);
    }
}