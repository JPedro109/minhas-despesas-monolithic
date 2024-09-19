export class InvalidPlanAmountError extends Error {
    constructor() {
        super("O valor do plano não pode ser menor que zero");
        this.name = "InvalidPlanAmountError";
    }
}