import { InvalidUserEmailError } from "@/layers/domain";

export class UserEmailValueObject {

	private readonly email: string;

	private constructor(email: string) {
		this.email = email;
	}
	
	public get value() : string {
		return this.email;
	}

	static create(email: string): UserEmailValueObject | InvalidUserEmailError {
		if(!this.validate(email)) return new InvalidUserEmailError(email);

		return new UserEmailValueObject(email);
	}

	private static validate(email: string): boolean {
		if(!email) return false;

		if(email.length > 256) return false;

		const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!emailRegEx.test(email)) return false;

		const [account, domain] = email.split("@");

		if (account.length > 64 || domain.length > 64) return false;

		return true;
	}
}