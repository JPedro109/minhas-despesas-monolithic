import { BcryptJSAdapter } from "@/layers/external";

describe("External - BcryptJSAdapter", () => {
    
	test("Should return the toHash | toHash", async () => {
		const password = "Password1234";
		const sut = new BcryptJSAdapter();
		jest.spyOn(sut, "toHash");

		const result = await sut.toHash(password);

		expect(result).not.toBe(password);
		expect(sut.toHash).toHaveBeenCalled();
		expect(sut.toHash).toHaveBeenCalledWith(password);
	});

	test("Should return false | compareHash", async  () => {
		const password = "Password1234";
		const sut = new BcryptJSAdapter();
		const toHash = await sut.toHash(password);
		jest.spyOn(sut, "compareHash");

		const result = await sut.compareHash(toHash, "Password12345");

		expect(result).toBe(false);
		expect(sut.compareHash).toHaveBeenCalled();
		expect(sut.compareHash).toHaveBeenCalledWith(toHash, "Password12345");
	});

	test("Should return true | compareHash", async  () => {
		const password = "Password1234";
		const sut = new BcryptJSAdapter();
		const toHash = await sut.toHash(password);
		jest.spyOn(sut, "compareHash");

		const result = await sut.compareHash(toHash, password);

		expect(result).toBe(true);
		expect(sut.compareHash).toHaveBeenCalled();
		expect(sut.compareHash).toHaveBeenCalledWith(toHash, password);
	});
});