import { JsonWebTokenType } from "@/layers/application";

export interface IAuthentication {
	createJsonWebToken(payload: { [key: string]: unknown }, expiryTimeInSeconds: number): string;
	verifyJsonWebToken(token: string): JsonWebTokenType;
}