import { WinstonAdapter } from "@/layers/external";

describe("External - WinstonAdapter", () => {
    test("Should return true | trace", () => {
        const message = "message";
        const trace = "0000000000";
        const sut = new WinstonAdapter();
        jest.spyOn(sut, "trace");

        const result = sut.trace(message, trace);

        expect(result).toBeTruthy();
        expect(sut.trace).toHaveBeenCalled();
        expect(sut.trace).toHaveBeenCalledWith(message, trace);
    });

    test("Should return true | info", () => {
        const message = "message";
        const sut = new WinstonAdapter();
        jest.spyOn(sut, "info");

        const result = sut.info(message);

        expect(result).toBeTruthy();
        expect(sut.info).toHaveBeenCalled();
        expect(sut.info).toHaveBeenCalledWith(message);
    });

    test("Should return true | warning", () => {
        const message = "message";
        const sut = new WinstonAdapter();
        jest.spyOn(sut, "warning");

        const result = sut.warning(message);

        expect(result).toBeTruthy();
        expect(sut.warning).toHaveBeenCalled();
        expect(sut.warning).toHaveBeenCalledWith(message);
    });

    test("Should return true | error", () => {
        const message = "message";
        const sut = new WinstonAdapter();
        jest.spyOn(sut, "error");

        const result = sut.error(message, new Error());

        expect(result).toBeTruthy();
        expect(sut.error).toHaveBeenCalled();
        expect(sut.error).toHaveBeenCalledWith(message, new Error());
    });
});
