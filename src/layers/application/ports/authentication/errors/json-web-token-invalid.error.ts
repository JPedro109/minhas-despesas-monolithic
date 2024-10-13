import { UnauthorizedError } from "@/layers/application/errors";

export class JsonWebTokenInvalidError extends UnauthorizedError {
	constructor(message: string) {
		super(message);
		this.name = "JsonWebTokenInvalidError";
	}
}