import { DomainError } from "@/layers/domain";

export class InvalidExtractReferenceYearError extends DomainError {
    constructor() {
        super("O ano deve ser maior ou igual a 2024");
        this.name = "InvalidExtractReferenceYearError";
    }
}
