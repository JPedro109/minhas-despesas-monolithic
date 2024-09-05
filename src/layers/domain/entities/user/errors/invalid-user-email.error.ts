import { DomainError } from "@/layers/domain";

export class InvalidUserEmailError extends DomainError {
	constructor(email: string) {
		super(`Esse email (${email}) é inválido`);
		this.name = "InvalidUserEmailError";
	}
}