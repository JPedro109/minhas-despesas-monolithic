import { ExtractReferenceYearValueObject, InvalidExtractReferenceYearError } from "@/layers/domain";

describe("Value Object - ExtractReferenceYearValueObject", () => {

    test("Should not create ExtractReferenceYearValueObject, because reference year is empty", () => {
        const invalidExtractReferenceYear = null;

        const sut = ExtractReferenceYearValueObject.create(invalidExtractReferenceYear);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceYearError);
    });

    test("Should not create ExtractReferenceYearValueObject, because reference year is less than 2024", () => {
        const invalidExtractReferenceYear = 2023;

        const sut = ExtractReferenceYearValueObject.create(invalidExtractReferenceYear);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceYearError);
    });

    
    test("Should create ExtractReferenceYearValueObject", () => {
        const extractReferenceYear = 2024;

        const sut = ExtractReferenceYearValueObject.create(extractReferenceYear) as unknown as ExtractReferenceYearValueObject;

        expect(sut).toBeInstanceOf(ExtractReferenceYearValueObject);
        expect(sut.value).toBe(extractReferenceYear);
    });
});