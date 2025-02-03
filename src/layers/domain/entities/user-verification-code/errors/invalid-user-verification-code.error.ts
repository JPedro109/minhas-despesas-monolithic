import { DomainError } from "@/layers/domain";

export class InvalidUserVerificationCodeError extends DomainError {
    constructor() {
        super("O código de verificação do usuário é inválido");
        this.name = "InvalidUserVerificationCodeError";
    }
}
