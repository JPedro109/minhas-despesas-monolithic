import { DomainError } from "@/layers/domain";

export class InvalidUserEmailError extends DomainError {
	constructor() {
		super("O email é inválido");
		this.name = "InvalidUserEmailError";
	}
}