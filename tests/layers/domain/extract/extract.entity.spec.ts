import { ExtractEntity, DomainError } from "@/layers/domain";

describe("Entity - Extract", () => {

    test("Should not create ExtractEntity, because URL is invalid", () => {
        const invalidUrl = "invalid-url";
        const referenceMonth = 1;
      
        const sut = (): ExtractEntity => new ExtractEntity({
          url: invalidUrl,
          referenceMonth
        });
      
        expect(sut).toThrow(DomainError);
    });

    test("Should not create ExtractEntity, because reference month is invalid", () => {
        const url = "https://example.com";
        const invalidReferenceMonth = -1;

        const sut = (): ExtractEntity => new ExtractEntity({
          url,
          referenceMonth: invalidReferenceMonth
        });

        expect(sut).toThrow(DomainError);
    });


    test("Should create ExtractEntity", () => {
        const validUrl = "https://example.com";
        const referenceMonth = 1;
      
        const sut = new ExtractEntity({
          url: validUrl,
          referenceMonth
        });
      
        expect(sut).toBeInstanceOf(ExtractEntity);
    });
});