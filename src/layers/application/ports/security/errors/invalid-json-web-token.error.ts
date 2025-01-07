import { UnauthorizedError } from "@/layers/application/errors";

export class InvalidJsonWebTokenError extends UnauthorizedError {
    constructor(message: string) {
        super(message);
        this.name = "InvalidJsonWebTokenError";
    }
}
