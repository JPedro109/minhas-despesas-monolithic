import { InvalidUsernameError } from "@/layers/domain";

export class UsernameValueObject {

	private constructor(private readonly username: string) { }

	public get value(): string {
		return this.username;
	}

	static create(username: string): UsernameValueObject | InvalidUsernameError {
		if(!this.validate(username)) return new InvalidUsernameError();

		return new UsernameValueObject(username);
	}

	private static validate(username: string): boolean {
		if(!username) return false;

		if(username.length > 255) return false;

		return true;
	}
}