export class InvalidPlanNameError extends Error {
    constructor() {
        super("O nome do plano deve ter entre 1 e 50 caracteres");
        this.name = "InvalidPlanNameError";
    }
}