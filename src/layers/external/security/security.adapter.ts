import { environmentVariables } from "@/shared";
import { ISecurity, JsonWebTokenType, InvalidJsonWebTokenError } from "@/layers/application";

import jsonWebToken from "jsonwebtoken";

export class SecurityAdapter implements ISecurity {
	private readonly jsonWebToken = jsonWebToken;

	createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
		return this.jsonWebToken.sign(payload, environmentVariables.jwtKey, { expiresIn: expiryTimeInSeconds });
	}

	verifyJsonWebToken(token: string): JsonWebTokenType {
		try {
			return this.jsonWebToken.verify(token, environmentVariables.jwtKey) as JsonWebTokenType;
		} catch (e) {
			throw new InvalidJsonWebTokenError(e.message);
		}
	}

	verifyBasicAuthenticationCredential(credential: string): boolean {
		const credentials = Buffer.from(credential, "base64").toString("utf-8");
		const [username, password] = credentials.split(":");
		return username === environmentVariables.basicAuthenticationUser && password === environmentVariables.basicAuthenticationPassword;
	}
}