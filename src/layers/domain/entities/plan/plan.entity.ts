import { AbstractEntity } from "../abstract/abstract.entity";
import {
    PlanNameValueObject,
    PlanDescriptionValueObject,
    PlanAmountValueObject,
    PlanNameEnum
} from "@/layers/domain";

export type PlanActionProps = {
    id: string;
    name: string;
    description: string;
    totalOperations: number;
    createdAt: Date;
    updatedAt?: Date;
}

export type PlanProps = {
    name: PlanNameEnum;
    amount: number;
    description: string;
    actions: PlanActionProps[];
    updatedAt?: Date;
}

export class PlanEntity extends AbstractEntity<PlanProps> {

    constructor(props: PlanProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);

        const valueObjects = {
            name: PlanNameValueObject.create(props.name),
            description: PlanDescriptionValueObject.create(props.description),
            amount: PlanAmountValueObject.create(props.amount)
        };

        this.validate(valueObjects);
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

    get actions(): PlanActionProps[] {
        return this.props.actions;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}