import { 
    INotification,
    ISendNotificationOfSubscriptionThatAreComingDue, 
    IUnitOfWorkRepository, 
    MailBodyTypeEnum
} from "@/layers/application";

export class SendNotificationOfSubscriptionThatAreComingDue implements ISendNotificationOfSubscriptionThatAreComingDue {

    constructor(
        private readonly unitOfWorkRepository: IUnitOfWorkRepository,
        private readonly notification: INotification
    ) { }

    async execute(): Promise<void> {
        const subscriptionRepository = this.unitOfWorkRepository.getSubscriptionRepository();
        const userRepository = this.unitOfWorkRepository.getUserRepository();

        const today = new Date();
        const subscriptionsEndDate = new Date(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0);        
        subscriptionsEndDate.setDate(subscriptionsEndDate.getUTCDate() + 1);
        const subscriptionActives = await subscriptionRepository.getActiveSubscriptionsByEndDate(subscriptionsEndDate, true);

        if(subscriptionActives.length === 0) return;

        const subscriptionsMap = new Map<string, { planName: string, value: number }>();
        subscriptionActives.map(x => {
            subscriptionsMap.set(x.userId, { planName: x.plan.name, value: x.amount });
        });

        const userIds = Object.keys(
            Object.fromEntries(subscriptionsMap)
        );
        const users = await userRepository.getUsersByIds(userIds);

        const emails = [];
        users.forEach(user => {
            const expenses = subscriptionsMap.get(user.id);
            const email = this.notification.sendMail(user.email, MailBodyTypeEnum.NotifySubscriptionThatIsDueBody, expenses);
            emails.push(email);
        });

        const results = await Promise.allSettled(emails);

        const rejectedPromises = results.filter(x => x.status === "rejected");

        if(rejectedPromises.length > 0) {
            const errors = rejectedPromises.map(x => x.reason.message);
            throw new Error(errors.join(", "));
        }
    }
}