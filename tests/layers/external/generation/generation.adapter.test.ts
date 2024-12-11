import { GenerationAdapter } from "@/layers/external";

describe("External - GenerationAdapter", () => {
    
	test("Should return the code | generateCode", () => {
		const sut = new GenerationAdapter();
		jest.spyOn(sut, "generateCode");

		const result = sut.generateCode();

		expect(typeof result).toBe("string");
		expect(result.length).toBe(6);
		expect(sut.generateCode).toHaveBeenCalled();
	});

	test("Should return the code expiration date | generateCodeExpirationDate", () => {
		const sut = new GenerationAdapter();
		jest.spyOn(sut, "generateCodeExpirationDate");

		const result = sut.generateCodeExpirationDate();

		expect(typeof result).toBe("object");
		expect(sut.generateCodeExpirationDate).toHaveBeenCalled();
		expect(sut.generateCodeExpirationDate).toHaveBeenCalledWith();
	});
});