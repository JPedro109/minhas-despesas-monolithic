import { DomainError } from "@/layers/domain";

export class InvalidUsernameError extends DomainError {
	constructor() {
		super("O nome do usuário deve ter entre 1 e 255 caracteres");
		this.name = "InvalidUsernameError";
	}
}