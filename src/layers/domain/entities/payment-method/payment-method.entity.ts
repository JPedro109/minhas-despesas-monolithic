import { AbstractEntity } from "../abstract/abstract.entity";

export type PaymentMethodProps = {
    userId: string;
    name: string;
    token: string;
    updatedAt: Date;
}

export class PaymentMethodEntity extends AbstractEntity<PaymentMethodProps> {

    constructor(props: PaymentMethodProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);
    }

    get userId(): string {
        return this.props.userId;
    }

    get name(): string {
        return this.props.name;
    }

    get token(): string {
        return this.props.token;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }
}