import { InvalidUserVerificationCodeTypeError } from "@/layers/domain";

export type UserVerificationCodeTypeValueObjectProps = {
	id: string;
	typeName: string;
	createdAt: Date;
}

export class UserVerificationCodeTypeValueObject {

	private constructor(private readonly props: UserVerificationCodeTypeValueObjectProps) {
		this.props = props;
	}

	public get id(): string {
		return this.props.id;
	}

	public get typeName(): string {
		return this.props.typeName;
	}

	public get createdAt(): Date {
		return this.props.createdAt;
	}

	static create(props: UserVerificationCodeTypeValueObjectProps): UserVerificationCodeTypeValueObject | InvalidUserVerificationCodeTypeError {
		if(!this.validateTypeName(props.typeName)) return new InvalidUserVerificationCodeTypeError();

		return new UserVerificationCodeTypeValueObject(props);
	}

	private static validateTypeName(typeName: string): boolean {
		if(!typeName) return false;

		if(typeName.length > 15) return false;

		return true;
	}
}