export class InvalidExtractReferenceMonthError extends Error {
    constructor() {
        super("O mês de referência deve estar entre 1 e 12");
        this.name = "InvalidExtractReferenceMonthError";
    }
}