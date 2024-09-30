import { AbstractEntity } from "../abstract/abstract.entity";

export type CustomerProps = {
    userId: string;
    customerId: string;
}

export class CustomerEntity extends AbstractEntity<CustomerProps> {

    constructor(props: CustomerProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);
	}

    public get userId() : string {
        return this.props.userId;
    }
    
    public get customerId() : string {
        return this.props.customerId;
    }
}