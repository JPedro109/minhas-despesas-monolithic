import { DomainError } from "@/layers/domain";

export class InvalidPlanAmountError extends DomainError {
    constructor() {
        super("O valor do plano não pode ser menor que zero");
        this.name = "InvalidPlanAmountError";
    }
}