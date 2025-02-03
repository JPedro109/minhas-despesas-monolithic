import { ICryptography } from "@/layers/application";

import bcryptjs from "bcryptjs";

export class BcryptJSAdapter implements ICryptography {
    private readonly bcryptjs = bcryptjs;
    private readonly salt: number = 12;

    async toHash(value: string): Promise<string> {
        return await this.bcryptjs.hash(value, this.salt);
    }

    async compareHash(
        hash: string,
        valueToBeCompared: string,
    ): Promise<boolean> {
        return await this.bcryptjs.compare(valueToBeCompared, hash);
    }
}
