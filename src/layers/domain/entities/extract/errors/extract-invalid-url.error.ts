export class InvalidExtractUrlError extends Error {
    constructor() {
        super("A url é inválida");
        this.name = "InvalidUrlError";
    }
}