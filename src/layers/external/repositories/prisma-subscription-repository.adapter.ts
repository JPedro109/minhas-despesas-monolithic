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
                    planId: subscription.plan.id,
                    subscriptionExternalId: subscription.subscriptionExternalId,
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

    async getSubscriptionByUserId(
        userId: string,
    ): Promise<SubscriptionEntity | null> {
        const subscription = await this.context.prismaSubscription.findFirst({
            where: { userId },
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
}
