import { ExtractUrlValueObject, InvalidExtractUrlError } from "@/layers/domain";

describe("Value Object - ExtractUrlValueObject", () => {

    test("Should not create URL, because URL is empty", () => {
        const invalidUrl = "";

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create URL, because URL is invalid", () => {
        const invalidUrl = "htp://invalid-url";

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create URL, because URL has invalid scheme", () => {
        const invalidUrl = "ftp://example.com";

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create URL, because URL is too long", () => {
        const invalidUrl = "https://" + "a".repeat(2048);

        const sut = ExtractUrlValueObject.create(invalidUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    
    test("Should create URL, because URL is valid", () => {
        const url = "https://www.example.com";

        const sut = ExtractUrlValueObject.create(url);

        expect(sut).toBeInstanceOf(ExtractUrlValueObject);
    });
});