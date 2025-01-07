import { ExtractUrlValueObject, InvalidExtractUrlError } from "@/layers/domain";

describe("Value Object - ExtractUrlValueObject", () => {
    test("Should not create ExtractUrlValueObject, because url is empty", () => {
        const invalidExtractUrl = "";

        const sut = ExtractUrlValueObject.create(invalidExtractUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create ExtractUrlValueObject, because url is invalid", () => {
        const invalidExtractUrl = "htp://invalid-url";

        const sut = ExtractUrlValueObject.create(invalidExtractUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should not create ExtractUrlValueObject, because url is too long", () => {
        const invalidExtractUrl = "https://" + "a".repeat(2048);

        const sut = ExtractUrlValueObject.create(invalidExtractUrl);

        expect(sut).toBeInstanceOf(InvalidExtractUrlError);
    });

    test("Should create ExtractUrlValueObject, because url is valid", () => {
        const extractUrl = "https://www.example.com";

        const sut = ExtractUrlValueObject.create(
            extractUrl,
        ) as unknown as ExtractUrlValueObject;

        expect(sut).toBeInstanceOf(ExtractUrlValueObject);
        expect(sut.value).toBe(extractUrl);
    });
});
