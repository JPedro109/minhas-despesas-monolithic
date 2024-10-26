export class InvalidExtractReferenceYearError extends Error {
    constructor() {
        super("O ano deve ser maior ou igual a 2024");
        this.name = "InvalidExtractReferenceYearError";
    }
}