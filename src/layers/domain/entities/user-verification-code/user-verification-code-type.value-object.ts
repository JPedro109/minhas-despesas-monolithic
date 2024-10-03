import { UserVerificationCodeTypeEnum, InvalidUserVerificationCodeTypeError } from "@/layers/domain";

export class UserVerificationCodeTypeValueObject {

	private constructor(private readonly userVerificationCodeType: UserVerificationCodeTypeEnum) {
		this.userVerificationCodeType = userVerificationCodeType;
	}

	public get value(): UserVerificationCodeTypeEnum {
		return this.userVerificationCodeType;
	}

	static create(userVerificationCodeType: UserVerificationCodeTypeEnum): UserVerificationCodeTypeValueObject | InvalidUserVerificationCodeTypeError {
		if(!this.validate(userVerificationCodeType)) return new InvalidUserVerificationCodeTypeError();

		return new UserVerificationCodeTypeValueObject(userVerificationCodeType);
	}

	private static validate(typeName: UserVerificationCodeTypeEnum): boolean {
		if(!typeName) return false;

		let valid = false;

		for(const key in UserVerificationCodeTypeEnum) {
			if(typeName === UserVerificationCodeTypeEnum[key]) valid = true;
		}

		return valid;
	}
}