export class InvalidPlanDescriptionError extends Error {
    constructor() {
        super("A descrição do plano deve ter entre 1 e 100 caracteres");
        this.name = "InvalidPlanDescriptionError";
    }
}