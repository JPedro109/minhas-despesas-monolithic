import { AbstractEntity } from "../abstract/abstract.entity";
import {
    ExpenseNameValueObject,
    ExpenseValueValueObject,
    DomainError,
} from "@/layers/domain";

export type ExpenseProps = {
    userId: string;
    expenseName: string;
    expenseValue: number;
    dueDate: Date;
    paid: boolean;
    updatedAt?: Date;
};

export class ExpenseEntity extends AbstractEntity<ExpenseProps> {
    constructor(props: ExpenseProps, id?: string, createdAt?: Date) {
        super(props, id, createdAt);

        const valueObjects = {
            expenseName: ExpenseNameValueObject.create(props.expenseName),
            expenseValue: ExpenseValueValueObject.create(props.expenseValue),
        };

        this.validate(valueObjects);
    }

    get userId(): string {
        return this.props.userId;
    }

    get expenseName(): string {
        return this.props.expenseName;
    }

    set expenseName(expenseName: string) {
        const result = ExpenseNameValueObject.create(expenseName);
        if (result instanceof Error) throw result;
        this.props.expenseName = result.value;
        this.props.updatedAt = new Date();
    }

    get expenseValue(): number {
        return this.props.expenseValue;
    }

    set expenseValue(expenseValue: number) {
        const result = ExpenseValueValueObject.create(expenseValue);
        if (result instanceof Error) throw result;
        this.props.expenseValue = result.value;
        this.props.updatedAt = new Date();
    }

    get dueDate(): Date {
        return this.props.dueDate;
    }

    set dueDate(dueDate: Date) {
        this.props.dueDate = dueDate;
        this.props.updatedAt = new Date();
    }

    get paid(): boolean {
        return this.props.paid;
    }

    set paid(paid: boolean) {
        if (this.props.paid === paid)
            throw new DomainError(
                `A despesa já está ${paid ? "paga" : "como não paga"}`,
            );
        this.props.paid = paid;
        this.props.updatedAt = new Date();
    }

    get updatedAt(): Date | null {
        return this.props.updatedAt;
    }
}
