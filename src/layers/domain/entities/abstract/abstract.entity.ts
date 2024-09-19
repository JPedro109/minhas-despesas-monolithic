export abstract class AbstractEntity<Props> {
	constructor(
        protected props: Props, 
        private readonly entityId: string = "1",
        private readonly entityCreatedAt: Date = new Date(),
	) { }

	public get id(): string {
		return this.entityId;
	}

	public get createdAt(): Date {
		return this.entityCreatedAt;
	}

	protected validate<T>(validations: T): { valid: boolean, errors?: string } {
		const errors = [];

		for(const key in validations) {
			if(validations[key] instanceof Error) {
				const error = validations[key];
				errors.push(error.message);
			}
		}

		const valid = errors.length === 0;

		return {
			valid,
			errors: !valid ? errors.join(", ") : null
		};
	}
}