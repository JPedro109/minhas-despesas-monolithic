import { InvalidExtractUrlError } from "./errors/extract-invalid-url.error";

export class ExtractUrlValueObject {
    private readonly url: string;

    private constructor(url: string) {
        this.url = url;
    }

    public get value(): string {
        return this.url;
    }

    static create(url: string): ExtractUrlValueObject | InvalidExtractUrlError {
        if (!this.validate(url)) return new InvalidExtractUrlError();

        return new ExtractUrlValueObject(url);
    }

    private static validate(url: string): boolean {
        if (!url) return false;

        const urlRegex = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-]*)*\/?(\?[^\s]*)?$/i;

        return urlRegex.test(url);
    }
}