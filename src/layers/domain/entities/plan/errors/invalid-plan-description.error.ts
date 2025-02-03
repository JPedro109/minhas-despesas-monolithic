import { DomainError } from "@/layers/domain";

export class InvalidPlanDescriptionError extends DomainError {
    constructor() {
        super("A descrição do plano deve ter entre 1 e 100 caracteres");
        this.name = "InvalidPlanDescriptionError";
    }
}
