/* eslint-disable @typescript-eslint/no-unused-vars */

import { ILog } from "@/layers/application";

export class LogStub implements ILog {
    trace(message: string, trace: string): void { }

    info(message: string): void { }

    warning(message: string): void { }

    error(message: string, error: Error): void { }
}

export const logStubFactory = (): LogStub => new LogStub();