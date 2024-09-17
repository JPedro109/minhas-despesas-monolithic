import { InvalidExtractReferenceMonthError } from "./errors/extract-invalid-reference-month.error";

export class ExtractReferenceMonthValueObject {
    private readonly referenceMonth: number;

    private constructor(referenceMonth: number) {
        this.referenceMonth = referenceMonth;
    }

    public get value(): number {
        return this.referenceMonth;
    }

    static create(referenceMonth: number): ExtractReferenceMonthValueObject | InvalidExtractReferenceMonthError {
        if (!this.validate(referenceMonth)) return new InvalidExtractReferenceMonthError();

        return new ExtractReferenceMonthValueObject(referenceMonth);
    }

    private static validate(referenceMonth: number): boolean {
        if (!referenceMonth) return false;

        if(referenceMonth < 1 || referenceMonth > 12) return false;

        return true;
    }
}