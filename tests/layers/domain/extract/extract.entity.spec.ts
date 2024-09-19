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
        const referenceMonth = -1;

        const sut = (): ExtractEntity => new ExtractEntity({
          url,
          referenceMonth
        });

        expect(sut).toThrow(DomainError);
    });


    test("Should create ExtractEntity", () => {
        const url = "https://example.com";
        const referenceMonth = 1;
      
        const sut = new ExtractEntity({
          url,
          referenceMonth
        });
      
        expect(sut).toBeInstanceOf(ExtractEntity);
        expect(sut.id).not.toBeUndefined();
        expect(sut.referenceMonth).toBe(referenceMonth);
        expect(sut.url).toBe(url);
        expect(sut.createdAt).not.toBeUndefined();
    });
});