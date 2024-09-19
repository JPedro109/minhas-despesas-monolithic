import { InvalidUserVerificationCodeTypeError } from "@/layers/domain";

export class UserVerificationCodeTypeValueObject {

	private constructor(private readonly userVerificationCodeType: string) {
		this.userVerificationCodeType = userVerificationCodeType;
	}

	public get value(): string {
		return this.userVerificationCodeType;
	}

	static create(userVerificationCodeType: string): UserVerificationCodeTypeValueObject | InvalidUserVerificationCodeTypeError {
		if(!this.validate(userVerificationCodeType)) return new InvalidUserVerificationCodeTypeError();

		return new UserVerificationCodeTypeValueObject(userVerificationCodeType);
	}

	private static validate(typeName: string): boolean {
		if(!typeName) return false;

		if(typeName !== "create_user" && typeName !== "update_user" && typeName !== "verify_user_email") return false;

		return true;
	}
}