import { AbstractEntity } from "../abstract/abstract.entity";
import { PlanEntity } from "@/layers/domain";

export type SubscriptionProps = {
    userId: string;
    plan: PlanEntity;
    subscriptionExternalId: string;
    updatedAt?: Date;
};

export class SubscriptionEntity extends AbstractEntity<SubscriptionProps> {
    constructor(props: SubscriptionProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);
    }

    get userId(): string {
        return this.props.userId;
    }

    get subscriptionExternalId(): string {
        return this.props.subscriptionExternalId;
    }

    get plan(): PlanEntity {
        return this.props.plan;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}
