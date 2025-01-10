import { SubscriptionEntity } from "@/layers/domain";
import { ISubscriptionRepository } from "@/layers/application";
import {
    DatabaseSQLHelper,
    PrismaClientType,
    PrismaMapperHelper,
} from "@/layers/external";

export class PrismaSubscriptionRepositoryAdapter
    implements ISubscriptionRepository
{
    private context: PrismaClientType;

    constructor(private readonly databaseSQLHelper: DatabaseSQLHelper) {
        this.context = this.databaseSQLHelper.client;
    }

    setContext(context: unknown): void {
        this.context = context as PrismaClientType;
    }

    async createSubscription(
        subscription: SubscriptionEntity,
    ): Promise<SubscriptionEntity> {
        const createdSubscription =
            await this.context.prismaSubscription.create({
                data: {
                    id: subscription.id,
                    userId: subscription.userId,
                    active: subscription.active,
                    renewable: subscription.renewable,
                    amount: subscription.amount,
                    planId: subscription.plan.id,
                    startDate: subscription.startDate,
                    endDate: subscription.endDate,
                    createdAt: subscription.createdAt,
                    updatedAt: subscription.updatedAt,
                },
                include: {
                    plan: {
                        include: {
                            actions: true,
                        },
                    },
                },
            });

        return PrismaMapperHelper.toSubscriptionEntity(
            createdSubscription,
            createdSubscription.plan,
            createdSubscription.plan.actions,
        );
    }

    async getActiveSubscriptionByUserId(
        userId: string,
    ): Promise<SubscriptionEntity | null> {
        const subscription = await this.context.prismaSubscription.findFirst({
            where: { userId, active: true },
            include: {
                plan: {
                    include: {
                        actions: true,
                    },
                },
            },
        });

        if (!subscription) return null;

        return PrismaMapperHelper.toSubscriptionEntity(
            subscription,
            subscription.plan,
            subscription.plan.actions,
        );
    }

    async getActiveSubscriptionsByEndDate(
        endDate: Date,
        renewable: boolean,
    ): Promise<SubscriptionEntity[]> {
        const subscriptions = await this.context.prismaSubscription.findMany({
            where: { endDate, renewable, active: true },
            include: {
                plan: {
                    include: {
                        actions: true,
                    },
                },
            },
        });

        return subscriptions.map((subscription) =>
            PrismaMapperHelper.toSubscriptionEntity(
                subscription,
                subscription.plan,
                subscription.plan.actions,
            ),
        );
    }

    async getSubscriptionsActiveAndRenewableWhenTheCurrentDateIsGreaterThanTheEndDate(): Promise<
        SubscriptionEntity[]
    > {
        const currentDate = new Date();

        const subscriptions = await this.context.prismaSubscription.findMany({
            where: {
                endDate: { lt: currentDate },
                renewable: true,
                active: true,
            },
            include: {
                plan: {
                    include: {
                        actions: true,
                    },
                },
            },
        });

        return subscriptions.map((subscription) =>
            PrismaMapperHelper.toSubscriptionEntity(
                subscription,
                subscription.plan,
                subscription.plan.actions,
            ),
        );
    }

    async updateSubscriptionById(
        subscriptionId: string,
        subscription: SubscriptionEntity,
    ): Promise<void> {
        await this.context.prismaSubscription.update({
            where: { id: subscriptionId },
            data: {
                active: subscription.active,
                renewable: subscription.renewable,
                amount: subscription.amount,
                startDate: subscription.startDate,
                endDate: subscription.endDate,
                updatedAt: subscription.updatedAt,
            },
        });
    }
}
