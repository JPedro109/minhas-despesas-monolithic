import { InvalidExtractReferenceYearError } from "./errors/invalid-extract-reference-year.error";

export class ExtractReferenceYearValueObject {
    private constructor(private readonly referenceYear: number) {}

    public get value(): number {
        return this.referenceYear;
    }

    static create(
        referenceYear: number,
    ): ExtractReferenceYearValueObject | InvalidExtractReferenceYearError {
        if (!this.validate(referenceYear))
            return new InvalidExtractReferenceYearError();

        return new ExtractReferenceYearValueObject(referenceYear);
    }

    private static validate(referenceYear: number): boolean {
        if (!referenceYear) return false;

        if (referenceYear < 2024) return false;

        return true;
    }
}
