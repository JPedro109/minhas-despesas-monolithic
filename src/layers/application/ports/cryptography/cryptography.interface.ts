export interface ICryptography {
    toHash(value: string): Promise<string>;
    compareHash(hash: string, valueToBeCompared: string): Promise<boolean>;
}
