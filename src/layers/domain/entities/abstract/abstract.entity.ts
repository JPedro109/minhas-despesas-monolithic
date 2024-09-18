export abstract class AbstractEntity<Props> {
	constructor(
        protected props: Props, 
        private readonly id: string = "1"
	) { }

	public get value() : string {
		return this.id;
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