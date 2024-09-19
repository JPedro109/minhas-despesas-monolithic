import { AbstractEntity } from "../abstract/abstract.entity";

export type PaymentHistoryProps = {
    userId: string;
    expenseId: string;
    expenseName: string;
    expenseValue: number;
    dueDate: Date;
    paidDate: Date;
}

export class PaymentHistoryEntity extends AbstractEntity<PaymentHistoryProps> {

    constructor(props: PaymentHistoryProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);
    }

    get userId(): string {
        return this.props.userId;
    }

    get expenseId(): string {
        return this.props.expenseId;
    }

    get expenseName(): string {
        return this.props.expenseName;
    }

    get expenseValue(): number {
        return this.props.expenseValue;
    }

    get dueDate(): Date {
        return this.props.dueDate;
    }

    get paidDate(): Date {
        return this.props.paidDate;
    }
}