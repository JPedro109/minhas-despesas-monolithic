import { DomainError } from "@/layers/domain";

export class InvalidExtractUrlError extends DomainError {
    constructor() {
        super("A url é inválida");
        this.name = "InvalidExtractUrlError";
    }
}