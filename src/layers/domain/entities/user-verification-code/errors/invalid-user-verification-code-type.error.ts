import { DomainError } from "@/layers/domain";

export class InvalidUserVerificationCodeTypeError extends DomainError {
    constructor() {
        super("O tipo do código de verificação do usuário inválido");
        this.name = "InvalidUserVerificationCodeTypeError";
    }
}
