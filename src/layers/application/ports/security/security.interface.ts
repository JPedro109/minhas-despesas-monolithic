import { JsonWebTokenType } from "@/layers/application";

export interface ISecurity {
    createJsonWebToken(
        payload: { [key: string]: unknown },
        expiryTimeInSeconds: number,
    ): string;
    verifyJsonWebToken(token: string): JsonWebTokenType;
    verifyBasicAuthenticationCredential(credential: string): boolean;
}
