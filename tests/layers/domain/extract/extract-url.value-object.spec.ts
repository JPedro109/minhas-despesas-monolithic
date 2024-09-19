import { ExtractUrlValueObject, InvalidExtractUrlError } from "@/layers/domain";

describe("Value Object - ExtractUrlValueObject", () => {

    test("Should not create ExtractUrlValueObject, because url is empty", () => {
        const invalidUrl = "";

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create ExtractUrlValueObject, because url is invalid", () => {
        const invalidUrl = "htp://invalid-url";

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create ExtractUrlValueObject, because url is too long", () => {
        const invalidUrl = "https://" + "a".repeat(2048);

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    
    test("Should create ExtractUrlValueObject, because url is valid", () => {
        const url = "https://www.example.com";

        const sut = ExtractUrlValueObject.create(url);

        expect(sut).toBeInstanceOf(ExtractUrlValueObject);
    });
});