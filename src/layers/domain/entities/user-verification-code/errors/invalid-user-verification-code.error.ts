import { DomainError } from "@/layers/domain";

export class InvalidUserVerificationCodeError extends DomainError {
	constructor() {
		super("Código de verificação do usuário inválido");
		this.name = "InvalidUserVerificationCodeError";
	}
}