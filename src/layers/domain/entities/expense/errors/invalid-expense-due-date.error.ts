import { DomainError } from "@/layers/domain";

export class InvalidExpenseDueDateError extends DomainError {
    constructor() {
        super("A data de vencimento deve ser maior que a data atual");
        this.name = "InvalidExpenseDueDateError";
    }
}