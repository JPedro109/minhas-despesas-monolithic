/* eslint-disable @typescript-eslint/no-unused-vars */

import { ISecurity, ILog, JsonWebTokenType } from "@/layers/application";

export class SecurityStub implements ISecurity {
    createJsonWebToken(payload: object, expiryTimeInSeconds: number): string {
        return "token";
    }

    verifyJsonWebToken(token: string): JsonWebTokenType {
        return {
            id: "1",
            email: "email@test.com",
            type: "access_token"
        };
    }
}


export class LogStub implements ILog {
    trace(message: string, trace: string): void { }

    info(message: string): void { }

    warning(message: string): void { }

    error(message: string, error: Error): void { }
}

export const logStubFactory = (): LogStub => new LogStub();