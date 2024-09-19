import { AbstractEntity } from "../abstract/abstract.entity";
import { 
    PlanNameValueObject, 
    PlanDescriptionValueObject,
    PlanActionValueObject, 
    DomainError, 
    PlanActionValueObjectProps 
} from "@/layers/domain";

export type PlanProps = {
    name: string;
    description: string;
    actions: PlanActionValueObjectProps[];
    updatedAt?: Date;
}

export class PlanEntity extends AbstractEntity<PlanProps> {

    constructor(props: PlanProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

        const valueObjects = {
            name: PlanNameValueObject.create(props.name),
            description: PlanDescriptionValueObject.create(props.description)
        };

        props.actions.map((action, index) => valueObjects[`${action}${index + 1}`] = PlanActionValueObject.create(action));

        const result = this.validate(valueObjects);

        if (!result.valid) throw new DomainError(result.errors);
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        const result = PlanNameValueObject.create(name);
        if (result instanceof Error) throw result;
        this.props.name = result.value;
        this.props.updatedAt = new Date();
    }

    get description(): string {
        return this.props.description;
    }

    set description(description: string) {
        const result = PlanDescriptionValueObject.create(description);
        if (result instanceof Error) throw result;
        this.props.description = result.value;
        this.props.updatedAt = new Date();
    }

    get actions(): PlanActionValueObjectProps[] {
        return this.props.actions;
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}