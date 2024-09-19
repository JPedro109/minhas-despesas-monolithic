import { AbstractEntity } from "../abstract/abstract.entity";
import { ExpenseNameValueObject, ExpenseValueValueObject, ExpenseDueDateValueObject, DomainError } from "@/layers/domain";

export type ExpenseProps = {
    enpenseName: string;
    expenseValue: number;
    dueDate: Date;
    paid: boolean;
	updatedAt?: Date;
}

export class ExpenseEntity extends AbstractEntity<ExpenseProps> {

    constructor(props: ExpenseProps, id?: string, createdAt?: Date) {
		super(props, id, createdAt);

		const valueObjets = {
			enpenseName: ExpenseNameValueObject.create(props.enpenseName),
			expenseValue: ExpenseValueValueObject.create(props.expenseValue),
			dueDate: ExpenseDueDateValueObject.create(props.dueDate),
		};

		const result = this.validate(valueObjets);

		if(!result.valid) throw new DomainError(result.errors);
	}

    get expenseName(): string {
        return this.props.enpenseName;
    }

    set expenseName(expenseName: string) {
        const result = ExpenseNameValueObject.create(expenseName);
		if (result instanceof Error) throw result;
        this.props.enpenseName = result.value;
    }

    get expenseValue(): number {
        return this.props.expenseValue;
    }

    set expenseValue(expenseValue: number) {
        const result = ExpenseValueValueObject.create(expenseValue);
		if (result instanceof Error) throw result;
        this.props.expenseValue = result.value;
    }

    get dueDate(): Date {
        return this.props.dueDate;
    }

    set dueDate(dueDate: Date) {
        const result = ExpenseDueDateValueObject.create(dueDate);
		if (result instanceof Error) throw result;
        this.props.dueDate = result.value;
    }

    get paid(): boolean {
        return this.props.paid;
    }

    set paid(paid: boolean) {
		if(this.props.paid === paid) throw new DomainError(`A despesa já está ${paid ? "paga" : "como não paga"}`);
        this.props.paid = paid;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    set updatedAt(updatedAt: Date) {
        this.props.updatedAt = updatedAt;
    }
}