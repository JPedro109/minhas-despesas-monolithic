import { DomainError } from "@/layers/domain";

export class InvalidPlanNameError extends DomainError {
    constructor() {
        super("O nome do plano deve ter entre 1 e 50 caracteres");
        this.name = "InvalidPlanNameError";
    }
}