import { ExtractReferenceMonthValueObject, InvalidExtractReferenceMonthError } from "@/layers/domain";

describe("Value Object - ExtractReferenceMonthValueObject", () => {

    test("Should not create ExtractReferenceMonthValueObject, because reference month is empty", () => {
        const invalidExtractReferenceMonth = null;

        const sut = ExtractReferenceMonthValueObject.create(invalidExtractReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    test("Should not create ExtractReferenceMonthValueObject, because reference month is less than 1", () => {
        const invalidExtractReferenceMonth = 0;

        const sut = ExtractReferenceMonthValueObject.create(invalidExtractReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    test("Should not create ExtractReferenceMonthValueObject, because reference month is greater than 12", () => {
        const invalidExtractReferenceMonth = 13;

        const sut = ExtractReferenceMonthValueObject.create(invalidExtractReferenceMonth);

        expect(sut).toBeInstanceOf(InvalidExtractReferenceMonthError);
    });

    
    test("Should create ExtractReferenceMonthValueObject", () => {
        const extractReferenceMonth = 1;

        const sut = ExtractReferenceMonthValueObject.create(extractReferenceMonth) as unknown as ExtractReferenceMonthValueObject;

        expect(sut).toBeInstanceOf(ExtractReferenceMonthValueObject);
        expect(sut.value).toBe(extractReferenceMonth);
    });
});