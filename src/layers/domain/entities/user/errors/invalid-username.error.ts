import { DomainError } from "@/layers/domain";

export class InvalidUsernameError extends DomainError {
	constructor() {
		super("Nome de usuário inválido");
		this.name = "InvalidUsernameError";
	}
}