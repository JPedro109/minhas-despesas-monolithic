import { InvalidUserVerificationCodeError } from "@/layers/domain";

export class UserVerificationCodeValueObject {

	private constructor(private readonly userVerificationCode: string) {
		this.userVerificationCode = userVerificationCode;
	}

	public get value(): string {
		return this.userVerificationCode;
	}

	static create(userVerificationCode: string): UserVerificationCodeValueObject | InvalidUserVerificationCodeError {
		if(!this.validate(userVerificationCode)) return new InvalidUserVerificationCodeError();

		return new UserVerificationCodeValueObject(userVerificationCode);
	}

	private static validate(userVerificationCode: string): boolean {
		if(!userVerificationCode) return false;

		if(userVerificationCode.length > 6) return false;

		return true;
	}
}