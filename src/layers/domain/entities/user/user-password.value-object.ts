import { InvalidUserPasswordError } from "@/layers/domain";

export class UserPasswordValueObject {
	private constructor(private readonly userPassword: string) { }

	public get value() : string {
		return this.userPassword;
	}
	
	static create(userPassword: string): UserPasswordValueObject | InvalidUserPasswordError {
		if(!this.validate(userPassword)) return new InvalidUserPasswordError();

		return new UserPasswordValueObject(userPassword);
	}

	private static validate(userPassword: string): boolean {
		if(!userPassword) return false;

		const userPasswordRegExBcrypt = /^\$2[ayb]\$.{56}$/;
		if(userPasswordRegExBcrypt.test(userPassword)) return true;

		const userPasswordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/;
		if(userPasswordRegEx.test(userPassword)) return true;

		return false;
	}
}