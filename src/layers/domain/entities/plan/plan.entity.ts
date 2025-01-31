import { AbstractEntity } from "../abstract/abstract.entity";
import {
    PlanNameValueObject,
    PlanDescriptionValueObject,
    PlanAmountValueObject,
    PlanNameEnum,
} from "@/layers/domain";

export type PlanActionProps = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
};

export type PlanProps = {
    planExternalId: string;
    name: PlanNameEnum;
    amount: number;
    description: string;
    durationInDays: number;
    actions: PlanActionProps[];
    updatedAt?: Date;
};

export class PlanEntity extends AbstractEntity<PlanProps> {
    constructor(props: PlanProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);

        const valueObjects = {
            name: PlanNameValueObject.create(props.name),
            description: PlanDescriptionValueObject.create(props.description),
            amount: PlanAmountValueObject.create(props.amount),
        };

        this.validate(valueObjects);
    }

    get planExternalId(): string {
        return this.props.planExternalId;
    }

    get name(): string {
        return this.props.name;
    }

    get description(): string {
        return this.props.description;
    }

    get amount(): number {
        return this.props.amount;
    }

    get durationInDays(): number {
        return this.props.durationInDays;
    }

    get actions(): PlanActionProps[] {
        return this.props.actions;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}
