import { DomainError } from "@/layers/domain";

export class InvalidExpenseNameError extends DomainError {
    constructor() {
        super("O nome da despesa deve ter entre 1 e 60 caracteres");
        this.name = "InvalidExpenseNameError";
    }
}
