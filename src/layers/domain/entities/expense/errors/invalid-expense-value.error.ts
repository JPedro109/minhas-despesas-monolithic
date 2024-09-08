export class InvalidExpenseValueError extends Error {
    constructor() {
        super("O valor da despesa deve ser maior que zero");
        this.name = "InvalidExpenseValueError";
    }
}