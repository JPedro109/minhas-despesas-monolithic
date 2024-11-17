import { DomainError } from "@/layers/domain";

export class InvalidExtractReferenceMonthError extends DomainError {
    constructor() {
        super("O mês de referência deve estar entre 1 e 12");
        this.name = "InvalidExtractReferenceMonthError";
    }
}