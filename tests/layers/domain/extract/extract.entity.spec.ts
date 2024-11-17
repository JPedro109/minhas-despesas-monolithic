import { ExtractEntity, DomainError } from "@/layers/domain";

describe("Entity - Extract", () => {

  test("Should not create ExtractEntity, because URL is invalid", () => {
    const invalidUrl = "invalid-url";
    const referenceMonth = 1;
    const referenceYear = 2024;
    const userId = "1";
    const expiryDate = new Date("3000-01-01");

    const sut = (): ExtractEntity => new ExtractEntity({
      url: invalidUrl,
      referenceMonth,
      referenceYear,
      userId,
      expiryDate
    });

    expect(sut).toThrow(DomainError);
  });

  test("Should not create ExtractEntity, because reference month is invalid", () => {
    const url = "https://example.com";
    const referenceMonth = -1;
    const referenceYear = 2024;
    const userId = "1";
    const expiryDate = new Date("3000-01-01");

    const sut = (): ExtractEntity => new ExtractEntity({
      url,
      referenceMonth,
      referenceYear,
      userId,
      expiryDate
    });

    expect(sut).toThrow(DomainError);
  });

  test("Should not create ExtractEntity, because reference year is invalid", () => {
    const url = "https://example.com";
    const referenceMonth = 1;
    const invalidReferenceYear = 2023;
    const userId = "1";
    const expiryDate = new Date("3000-01-01");

    const sut = (): ExtractEntity => new ExtractEntity({
      url,
      referenceMonth,
      referenceYear: invalidReferenceYear,
      userId,
      expiryDate
    });

    expect(sut).toThrow(DomainError);
  });

  test("Should not create ExtractEntity, because reference expiry date is invalid", () => {
    const url = "https://example.com";
    const referenceMonth = 1;
    const invalidReferenceYear = 2024;
    const userId = "1";
    const expiryDate = new Date("2000-01-01");

    const sut = (): ExtractEntity => new ExtractEntity({
      url,
      referenceMonth,
      referenceYear: invalidReferenceYear,
      userId,
      expiryDate
    });

    expect(sut).toThrow(DomainError);
  });

  test("Should create ExtractEntity", () => {
    const url = "https://example.com";
    const referenceMonth = 1;
    const referenceYear = 2024;
    const userId = "1";
    const expiryDate = new Date("3000-01-01");

    const sut = new ExtractEntity({
      url,
      referenceMonth,
      referenceYear,
      userId,
      expiryDate
    });

    expect(sut).toBeInstanceOf(ExtractEntity);
    expect(sut.id).not.toBeUndefined();
    expect(sut.referenceMonth).toBe(referenceMonth);
    expect(sut.referenceYear).toBe(referenceYear);
    expect(sut.url).toBe(url);
    expect(sut.userId).toBe(userId);
    expect(sut.createdAt).not.toBeUndefined();
    expect(sut.updatedAt).toBeUndefined();
  });
});