import { InvalidUserPasswordError } from "@/layers/domain";

export class UserPasswordValueObject {

	private readonly password: string;
	
	private constructor(password: string) {
		this.password = password;
	}

	public get value() : string {
		return this.password;
	}
	
	static create(password: string): UserPasswordValueObject | InvalidUserPasswordError {
		if(!this.validate(password)) return new InvalidUserPasswordError();

		return new UserPasswordValueObject(password);
	}

	private static validate(password: string): boolean {
		if(!password) return false;

		const passwordRegExBcrypt = /^\$2[ayb]\$.{56}$/;
		if(passwordRegExBcrypt.test(password)) return true;

		const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/;
		if(passwordRegEx.test(password)) return true;

		return false;
	}
}