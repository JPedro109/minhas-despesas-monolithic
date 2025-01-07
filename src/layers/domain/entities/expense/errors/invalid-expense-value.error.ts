import { DomainError } from "@/layers/domain";

export class InvalidExpenseValueError extends DomainError {
    constructor() {
        super("O valor da despesa deve ser maior que zero");
        this.name = "InvalidExpenseValueError";
    }
}
