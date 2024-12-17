import { DomainError } from "@/layers/domain";
import { randomUUID } from "node:crypto";

export abstract class AbstractEntity<Props> {
	constructor(
        protected props: Props, 
        private readonly entityId: string = randomUUID(),
        private readonly entityCreatedAt: Date = new Date()
	) { }

	public get id(): string {
		return this.entityId;
	}

	public get createdAt(): Date {
		return this.entityCreatedAt;
	}

	protected validate<T>(validations: T): void {
		const errors = [];

		for(const key in validations) {
			if(validations[key] instanceof Error) {
				const error = validations[key];
				errors.push(error.message);
			}
		}

		if(errors.length > 0) throw new DomainError(errors.join(", "));
	}
}