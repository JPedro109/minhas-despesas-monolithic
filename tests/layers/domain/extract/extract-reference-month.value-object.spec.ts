import { ExtractReferenceMonthValueObject, InvalidExtractReferenceMonthError } from "@/layers/domain";

describe("Value Object - ExtractReferenceMonthValueObject", () => {

    test("Should not create reference month, because reference month is empty", () => {
        const invalidReferenceMonth = null;

        const sut = ExtractReferenceMonthValueObject.create(invalidReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    test("Should not create reference month, because reference month is less than 1", () => {
        const invalidReferenceMonth = 0;

        const sut = ExtractReferenceMonthValueObject.create(invalidReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    test("Should not create reference month, because reference month is greater than 12", () => {
        const invalidReferenceMonth = 13;

        const sut = ExtractReferenceMonthValueObject.create(invalidReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    
    test("Should create reference month, because reference month is valid", () => {
        const referenceMonth = 1;

        const sut = ExtractReferenceMonthValueObject.create(referenceMonth);

        expect(sut).toBeInstanceOf(ExtractReferenceMonthValueObject);
    });
});