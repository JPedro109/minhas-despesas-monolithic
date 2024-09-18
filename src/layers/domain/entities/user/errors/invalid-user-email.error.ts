import { DomainError } from "@/layers/domain";

export class InvalidUserEmailError extends DomainError {
	constructor() {
		super("Esse email é inválido");
		this.name = "InvalidUserEmailError";
	}
}