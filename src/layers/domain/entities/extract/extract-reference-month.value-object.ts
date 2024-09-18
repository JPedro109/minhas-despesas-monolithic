import { InvalidExtractReferenceMonthError } from "./errors/extract-invalid-reference-month.error";

export class ExtractReferenceMonthValueObject {
    private constructor(private readonly referenceMonth: number) { }

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